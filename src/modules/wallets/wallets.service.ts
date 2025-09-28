import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EntityManager, LockMode } from '@mikro-orm/postgresql';
import { UsersService } from '../users/users.service.js';
import { WalletsRepository } from './repository/wallets.repository.js';
import { TransactionsService } from '../transactions/transactions.service.js';
import { CreditOptions } from './types/credit-options.type.js';
import { AmountType } from './constants/amount-type.enum.js';

@Injectable()
export class WalletsService {
  constructor(
    private readonly em: EntityManager,
    private readonly walletRepository: WalletsRepository,
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
  ) {}

  async ensureWalletByTelegramId(telegramId: string) {
    return this.em.transactional(async (em) => {
      const user = await this.usersService.findByTelegramId(telegramId);
      if (!user) throw new NotFoundException('user not found');

      let wallet = await this.walletRepository.findByUser(user);
      if (!wallet) {
        wallet = this.walletRepository.create(user);
        await em.flush();
      }
      return wallet;
    });
  }

  async balanceByUserId(userId: number) {
    return this.em.transactional(async (em) => {
      const user = await this.usersService.findById(userId);
      if (!user) throw new NotFoundException('user not found');
      const wallet = await this.walletRepository.findByUser(user);
      return { balance: wallet?.balanceCrystals ?? 0 };
    });
  }

  async credit({
    userId,
    amount,
    reason,
    correlationId,
    type = AmountType.CREDIT,
  }: CreditOptions) {
    if (amount <= 0) throw new BadRequestException('amount must be > 0');

    return this.em.transactional(async (em) => {
      const user = await this.usersService.findById(userId);
      if (!user) throw new NotFoundException('user not found');

      let wallet = await this.walletRepository.findByUser(user);
      if (!wallet) {
        wallet = this.walletRepository.create(user);
        await em.flush();
      }

      await em.lock(wallet, LockMode.PESSIMISTIC_WRITE).catch(() => {});

      if (correlationId) {
        const exists =
          await this.transactionsService.getByCorrelationId(correlationId);
        if (exists) {
          return {
            balance: wallet.balanceCrystals,
            transactionId: exists.id,
            idempotent: true,
          };
        }
      }

      const result = await this.transactionsService.createIdempotent(
        wallet,
        amount,
        type,
        { reason, correlationId },
      );

      wallet.balanceCrystals += amount;
      this.walletRepository.persist(wallet);
      await em.flush();

      return {
        balance: wallet.balanceCrystals,
        transactionId: result.transactionId,
        idempotent: result.idempotent,
      };
    });
  }

  async debit({
    userId,
    amount,
    reason,
    correlationId,
    type = AmountType.CREDIT,
  }: CreditOptions) {
    if (amount <= 0) throw new BadRequestException('amount must be > 0');

    return this.em.transactional(async (em) => {
      const user = await this.usersService.findById(userId);
      if (!user) throw new NotFoundException('user not found');
      const wallet = await this.walletRepository.findByUser(user);
      if (!wallet) throw new NotFoundException('wallet not found');

      if (wallet.balanceCrystals < amount) {
        throw new BadRequestException('insufficient balance');
      }

      if (correlationId) {
        const exists = await this.transactionsService.getByCorrelationId( correlationId);
        if (exists) {
          return {
            balance: wallet.balanceCrystals,
            transactionId: exists.id,
            idempotent: true,
          };
        }
      }

      const tx = await this.transactionsService.createIdempotent(
        wallet,
        amount,
        type,
        { reason, correlationId },
      );
      wallet.balanceCrystals -= amount;

      await em.persistAndFlush([wallet, tx]);
      return {
        balance: wallet.balanceCrystals,
        transactionId: tx.transactionId,
        idempotent: tx.idempotent,
      };
    });
  }
}
