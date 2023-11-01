import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { newProduct } from '../database/database.dto';
import { GenericService } from '../service/generic.service';
import { ProductRepository } from '../repository/product.repository';
import { DbName } from 'src/helper/enum';

@Injectable()
export class ProductService extends GenericService<Product, ProductRepository> {
  constructor(
    protected r: ProductRepository,
    private readonly databaseProvider: DatabaseProvider,
  ) {
    super(r);
  }

  async getProduct() {
    this.r.getAllConnect();
    this.r.changeRepository(DbName.DB1_CONTAINER);
    console.log(this.databaseProvider.dataSources);
    const product = this.repository.findAll();

    return product;
  }

  // async createProduct(input: newProduct) {
  //   // const dataSource = this.databaseProvider.getDataSoruceByDbName(
  //   //   DbName.DB2_CONTAINER,
  //   // );
  //   const dataSource = this.databaseProvider.dataSources;
  //   // const product = (await dataSource).getRepository(Product).save(input);
  //   return dataSource;
  // }
}
