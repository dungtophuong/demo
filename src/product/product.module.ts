import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { RepositoriesModule } from 'src/repository/repository.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Product]),
    RepositoriesModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
