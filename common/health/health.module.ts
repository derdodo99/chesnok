import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisModule } from '../adapters/redis/redis.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [    TerminusModule,
        MikroOrmModule.forFeature([]), // для инъекции EntityManager
        RedisModule,      ],
    controllers: [HealthController],
})
export class HealthModule {}
