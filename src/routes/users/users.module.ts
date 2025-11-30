import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbService } from 'src/lib/db';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DbService],
})
export class UsersModule {}
