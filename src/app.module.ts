import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RedisModule } from '../common/adapters/redis/redis.module';
import { HealthModule } from '../common/health/health.module';
import { User } from './entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import { WalletsModule } from './modules/wallets/wallets.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([User, Wallet]),
    WalletsModule,
    TransactionsModule,
    UsersModule,
    HealthModule,
    RedisModule,
  ],
})
export class AppModule {}
