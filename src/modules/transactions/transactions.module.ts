import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Wallet } from '../../entities/wallet.entity';
import { User } from '../../entities/user.entity';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './repository/transactions.repository';

@Module({
  imports: [MikroOrmModule.forFeature([User, Wallet, Transaction])],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsService],
})
export class TransactionsModule {}
