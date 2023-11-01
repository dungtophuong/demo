import { Controller, Get, Next, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly productService: UserService) {}

  @Get()
  async getUser(@Next() next, @Res() res) {
    try {
      const result = await this.productService.getUser();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
