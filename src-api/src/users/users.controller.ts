import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // To anyone reading this, I know this is all plain text, I would use an auth server for logging in, this is just a simple solution that I am using for testing.
  @Get('/authUser')
  async authUser(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    return await this.userService.authUser(username, password);
  }
}
