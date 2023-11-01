import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnect } from './database.connect';
import { Database } from './database.entity';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Database]),
    // TypeOrmModule.forFeature([Product], 'db1'),
  ],
  providers: [DatabaseService, DatabaseConnect, DatabaseProvider],
  controllers: [DatabaseController],
  exports: [DatabaseProvider, DatabaseService],
})
export class DatabaseModule {}
