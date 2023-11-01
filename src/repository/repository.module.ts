import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { RepositoriesService } from './repository.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProductRepository, RepositoriesService],
  exports: [ProductRepository, RepositoriesService],
})
export class RepositoriesModule {}
