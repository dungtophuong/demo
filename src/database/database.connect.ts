import { Injectable, Scope } from '@nestjs/common';
import { Repository, createConnection } from 'typeorm';
import { Database } from './database.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseConnect {
  //   constructor(
  //     @InjectRepository(Database) private DbRepo: Repository<Database>,
  //   ) {}
  //   async getDbConnect(dbName: string) {
  //     console.log(dbName);
  //     const db = await this.DbRepo.findOne({ where: { dbName: dbName } });
  //     console.log(db);
  //     const connection = await createConnection({
  //       type: 'mysql',
  //       host: db.host,
  //       port: db.port,
  //       username: db.username,
  //       password: db.password,
  //       database: db.dbName,
  //       entities: [Product, User],
  //     });
  //     return connection;
  //   }
}
