import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/lib/db';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  create(userData: CreateUserDto) {
    return this.db.user.create({ data: userData });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
