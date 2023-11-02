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
  private dataSources: [] = [];

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
    });
  }

  async addDataSource(db: Database) {
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
  }

  getDataSoruceByDbName(dbName: string): DataSource {
    return this.dataSources[dbName];
  }
}
