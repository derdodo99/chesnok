import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) =>
        new Redis({
          host: cfg.get<string>('REDIS_HOST', '127.0.0.1'),
          port: cfg.get<number>('REDIS_PORT', 6379),
          lazyConnect: false,
          maxRetriesPerRequest: null,
        }),
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
