import { Module } from '@nestjs/common';
import { UsersRepository } from './repository/sers.repository';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
