import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersRepository } from './repository/sers.repository.js';


@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
