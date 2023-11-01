import { Injectable } from '@nestjs/common';
import { GenericRepository } from './generic.repository';
import { Product } from '../entities/product.entity';
import { EntityTarget } from 'typeorm';

@Injectable()
export class ProductRepository extends GenericRepository<Product> {
  getEntityType(): EntityTarget<Product> {
    return Product;
  }
}
