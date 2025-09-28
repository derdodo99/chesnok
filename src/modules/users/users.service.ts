import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../../entities/user.entity';
import { UsersRepository } from './repository/sers.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findByTelegramId(telegramId: string): Promise<User | null> {
    return this.usersRepo.findByTelegramId(telegramId);
  }
  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findById(id);
  }
}
