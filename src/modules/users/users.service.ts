import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/sers.repository.js';
import { User } from '../../entities/user.entity.js';


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
