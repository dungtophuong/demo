import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Database } from './database.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'admin',
  password: 'password',
  database: 'db',
  entities: [Database],
  migrations: [join(__dirname, '../migrations/*{.js,.ts}')],
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
