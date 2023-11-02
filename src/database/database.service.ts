import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Database } from './database.entity';
import { Repository } from 'typeorm';
import { newDatabaseDto } from './database.dto';
import { DatabaseProvider } from './database.provider';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Database) private DbRepo: Repository<Database>,
    private readonly databaseProvider: DatabaseProvider,
  ) {}
  async createDb(input: newDatabaseDto) {
    const db = await this.DbRepo.save(input);
    await this.databaseProvider.addDataSource(db);
    return db;
  }
  // async createProduct(input: newProduct) {
  //   const product = this.productRepo.save(input);
  //   return product;
  // }
}

// import { Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import DataSourceManager from './database.util';

// @Injectable()
// export class DatabaseService {
//   async getDBDataSource(dataSourceName: string): Promise<DataSource> {
//     return DataSourceManager.getInstance().getDBDataSource(dataSourceName);
//   }
//   // get database name by subdomain
//   async getDatabaseName(subdomain: string): Promise<string> {
//     const databaseName = subdomain;
//     return databaseName;
//   }
// }
