import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('/authUser')
  async authUser(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    return await this.userService.authUser(username, password);
  }
}
