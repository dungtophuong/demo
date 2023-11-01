import { Body, Controller, Get, Next, Post, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { newProduct } from 'src/database/database.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProduct(@Next() next, @Res() res) {
    try {
      const result = await this.productService.getProduct();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // @Post()
  // async createProduct(@Body() input: newProduct, @Next() next, @Res() res) {
  //   try {
  //     const result = await this.productService.createProduct(input);
  //     return res.status(200).send(result);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}
