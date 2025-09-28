import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Transaction } from '../../../entities/transaction.entity';
import { Wallet } from '../../../entities/wallet.entity';
import { AmountType } from '../../wallets/constants/amount-type.enum';
import { CreateOptions } from '../types/create-options.type';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly em: EntityManager) {}

  async findById(id: number): Promise<Transaction | null> {
    return this.em.findOne(Transaction, { id });
  }

  async findByCorrelationId(
    correlationId: string,
  ): Promise<Transaction | null> {
    return this.em.findOne(Transaction, { correlationId });
  }

  async listByWallet(
    wallet: Wallet,
    limit = 50,
    offset = 0,
  ): Promise<Transaction[]> {
    return this.em.find(
      Transaction,
      { wallet },
      { orderBy: { createdAt: 'DESC' }, limit, offset },
    );
  }

  /**
   * Создаёт транзакцию БЕЗ изменения баланса (балансом занимается WalletsService).
   * Здесь — только запись в журнал.
   */
  async create(
    wallet: Wallet,
    amount: number,
    type: AmountType,
    options?: CreateOptions,
  ): Promise<Transaction> {
    const tx = this.em.create(Transaction, {
      wallet,
      amount,
      type,
      reason: options?.reason,
      correlationId: options?.correlationId,
    });
    await this.em.persistAndFlush(tx);
    return tx;
  }
}
