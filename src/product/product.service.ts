import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';
import { Product } from '../entities/product.entity';
import { GenericService } from '../service/generic.service';
import { ProductRepository } from '../repository/product.repository';
import { newProduct } from 'src/database/database.dto';

@Injectable()
export class ProductService extends GenericService<Product, ProductRepository> {
  constructor(
    protected r: ProductRepository,
    private readonly databaseProvider: DatabaseProvider,
  ) {
    super(r);
  }

  async getProduct(dbName: string) {
    // setTimeout(() => {
    //   this.r.changeConnect(this.databaseProvider.getDataSoruceByDbName(dbName));
    // }, 2000);
    this.r.changeConnect(this.databaseProvider.getDataSoruceByDbName(dbName));
    const product = await this.findAll();
    return product;
  }

  async createProduct(dbName: string, input: newProduct) {
    this.r.changeConnect(this.databaseProvider.getDataSoruceByDbName(dbName));
    const productEntity = new Product();
    Object.assign(productEntity, input);
    const product = await this.save(productEntity);
    return product;
  }
}
