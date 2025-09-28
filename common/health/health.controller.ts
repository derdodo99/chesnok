import { Controller, Get, Inject} from '@nestjs/common';
import {HealthCheck, HealthCheckService} from '@nestjs/terminus';
import {EntityManager} from "@mikro-orm/postgresql";
import Redis from "ioredis";

@Controller('health')
export class HealthController {
  constructor(
      private health: HealthCheckService,
      private readonly em: EntityManager,
      @Inject('REDIS') private readonly redis: Redis,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      async () => {
        await this.em.getConnection().execute('SELECT 1');
        return { database: { status: 'up' } };
      },
      async () => {
        await this.redis.ping();
        return { redis: { status: 'up' } };
      },
    ]);
  }
}
