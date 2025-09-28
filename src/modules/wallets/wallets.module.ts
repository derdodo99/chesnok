import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Wallet } from '../../entities/wallet.entity';
import { User } from '../../entities/user.entity';
import { Transaction } from '../../entities/transaction.entity';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';
import { WalletsRepository } from './repository/wallets.repository';

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
