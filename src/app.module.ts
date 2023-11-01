import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { join } from 'path';
import { Database } from './database/database.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import dataSource, { dataSourceOptions } from './database/data-source';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { RepositoriesModule } from './repository/repository.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'admin',
        password: 'password',
        database: 'db',
        entities: [Database],
        migrations: [join(__dirname, './migrations/*{.js,.ts}')],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   name: 'db1',
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: 'localhost',
    //     port: 3308,
    //     username: 'dung',
    //     password: 'password',
    //     database: 'db1',
    //     entities: [Product, User],
    //     migrations: [join(__dirname, './migrations/*{.js,.ts}')],
    //     synchronize: false,
    //     namingStrategy: new SnakeNamingStrategy(),
    //   }),
    //   inject: [ConfigService],
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   name: 'db2',
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: 'localhost',
    //     port: 3309,
    //     username: 'duy',
    //     password: 'password',
    //     database: 'db2',
    //     entities: [Product, User],
    //     migrations: [join(__dirname, './migrations/*{.js,.ts}')],
    //     synchronize: false,
    //     namingStrategy: new SnakeNamingStrategy(),
    //   }),
    //   inject: [ConfigService],
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   name: 'db3',
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: 'localhost',
    //     port: 3310,
    //     username: 'tung',
    //     password: 'password',
    //     database: 'db3',
    //     entities: [Product, User],
    //     migrations: [join(__dirname, './migrations/*{.js,.ts}')],
    //     synchronize: false,
    //     namingStrategy: new SnakeNamingStrategy(),
    //   }),
    //   inject: [ConfigService],
    // }),
    DatabaseModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
