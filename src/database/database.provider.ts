import { DataSource, Repository } from 'typeorm';
import { Database } from './database.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DatabaseProvider {
  constructor(
    @InjectRepository(Database) private dbRepo: Repository<Database>,
  ) {
    this.getDataSources();
  }
  public dataSources: [] = [];
  count = 0;

  async getDataSources() {
    const dbs = await this.dbRepo.find();
    dbs.map(async (db) => {
      const dataSource = new DataSource({
        type: 'mysql',
        name: db.dbName,
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.dbName,
        entities: [Product, User],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
      });
      this.dataSources[db.dbName] = await dataSource.initialize();

      // return dataSource.initialize();
    });
    this.count++;
  }

  // async addDataSource(newDatabaseDto: newDatabaseDto) {
  //   const db = await this.dbRepo.save(newDatabaseDto);
  //   const dataSource = new DataSource({
  //     type: 'mysql',
  //     name: db.dbName,
  //     host: db.host,
  //     port: db.port,
  //     username: db.username,
  //     password: db.password,
  //     database: db.dbName,
  //     entities: [Product, User],
  //     synchronize: false,
  //     namingStrategy: new SnakeNamingStrategy(),
  //     logging: true,
  //   });
  //   this.dataSources.push(dataSource.initialize());
  // }

  getDataSoruceByDbName(dbName: string) {
    console.log(Object.keys(this.dataSources));
    return this.dataSources[dbName];
  }
}
