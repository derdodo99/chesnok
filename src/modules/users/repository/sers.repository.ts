import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../../../entities/user.entity.js';


@Injectable()
export class UsersRepository {
  constructor(private readonly em: EntityManager) {}

  findByTelegramId(telegramId: string): Promise<User | null> {
    return this.em.findOne(User, { telegramId });
  }
  findById(id: number): Promise<User | null> {
    return this.em.findOne(User, { id });
  }
}
