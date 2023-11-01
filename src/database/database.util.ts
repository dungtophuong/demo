import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Database } from './database.entity';
import { join } from 'path';

export default class DataSourceManager {
  private static instance: DataSourceManager;

  private dataSources: { [key: string]: DataSource };

  private constructor() {
    this.dataSources = {};
  }

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }

    return DataSourceManager.instance;
  }

  async getDBDataSource(dataSourceName: string): Promise<DataSource> {
    if (this.dataSources[dataSourceName]) {
      const dataSource = this.dataSources[dataSourceName];
      return Promise.resolve(
        dataSource.isInitialized ? dataSource : dataSource.initialize(),
      );
    }

    const newDataSource = new DataSource({
      name: 'db3',
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'tung',
      password: 'password',
      database: 'db3',
      entities: [Database],
      migrations: [join(__dirname, './migrations/*{.js,.ts}')],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    });

    this.dataSources[dataSourceName] = newDataSource;

    return Promise.resolve(newDataSource.initialize());
  }
}
