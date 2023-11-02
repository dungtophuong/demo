import { Body, Controller, Get, Next, Post, Query, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { newProduct } from 'src/database/database.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProduct(@Query('db_name') dbName: string, @Next() next, @Res() res) {
    try {
      const result = await this.productService.getProduct(dbName);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @Post()
  async createProduct(
    @Query('db_name') dbName: string,
    @Body() input: newProduct,
    @Next() next,
    @Res() res,
  ) {
    try {
      const result = await this.productService.createProduct(dbName, input);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
