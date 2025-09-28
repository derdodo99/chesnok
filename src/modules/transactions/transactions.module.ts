import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../../entities/user.entity.js';
import { Wallet } from '../../entities/wallet.entity.js';
import { Transaction } from '../../entities/transaction.entity.js';
import { TransactionsService } from './transactions.service.js';
import { TransactionsRepository } from './repository/transactions.repository.js';


@Module({
  imports: [MikroOrmModule.forFeature([User, Wallet, Transaction])],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsService],
})
export class TransactionsModule {}
