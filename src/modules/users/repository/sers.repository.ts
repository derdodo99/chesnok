import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../../../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly em: EntityManager) {}

  findByTelegramId(telegramId: string) {
    return this.em.findOne(User, { telegramId });
  }
  findById(id: number) {
    return this.em.findOne(User, { id });
  }
}
