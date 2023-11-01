import { Body, Controller, Get, Next, Post, Query, Res } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { newDatabaseDto, newProduct } from './database.dto';
import { DatabaseConnect } from './database.connect';

@Controller('database')
export class DatabaseController {
  constructor(
    private databaseService: DatabaseService,
    private databaseConnect: DatabaseConnect,
  ) {}
  @Post()
  async createDb(@Body() input: newDatabaseDto, @Next() next, @Res() res) {
    try {
      const result = await this.databaseService.createDb(input);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // @Get()
  // async getDb(@Body() input: newDatabaseDto, @Next() next, @Res() res) {
  //   try {
  //     const result = await this.databaseProvider.connectDatabases();
  //     console.log(result);
  //     return res.status(200).send(result);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }

  // @Post('product')
  // async createProduct(@Body() input: newProduct, @Next() next, @Res() res) {
  //   try {
  //     const result = await this.databaseService.createProduct(input);
  //     return res.status(200).send(result);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
  //   @Get()
  //   async getDb(@Query('db_name') dbName: string, @Next() next, @Res() res) {
  //     try {
  //       const connection = this.databaseConnect.getDbConnect(dbName);
  //       const result = (await connection).getRepository(Product).save({
  //         name: 'product1',
  //       });
  //       return res.status(200).send(result);
  //     } catch (error) {
  //       console.log(error);
  //       next(error);
  //     }
  //   }
}
