import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseProvider: DatabaseProvider,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUser() {
    console.log(this.databaseProvider.getDataSources());
    console.log(this.databaseProvider.count);
  }
}
