import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../../entities/user.entity.js';
import { Wallet } from '../../entities/wallet.entity.js';
import { Transaction } from '../../entities/transaction.entity.js';
import { TransactionsModule } from '../transactions/transactions.module.js';
import { UsersModule } from '../users/users.module.js';
import { WalletsService } from './wallets.service.js';
import { WalletsRepository } from './repository/wallets.repository.js';
import { WalletsController } from './wallets.controller.js';


@Module({
  imports: [
    MikroOrmModule.forFeature([User, Wallet, Transaction]),
    TransactionsModule,
    UsersModule,
  ],
  providers: [WalletsService, WalletsRepository],
  controllers: [WalletsController],
  exports: [WalletsService],
})
export class WalletsModule {}
