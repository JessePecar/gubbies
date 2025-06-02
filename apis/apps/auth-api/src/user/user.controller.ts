import { UserService } from '@auth/user/user.service';
import { User } from '@core/decorators';
import { CreateUser, UpdateUser } from '@auth/user';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Get()
  async getUsers(@User() user) {
    // TODO: Get the users from the user's chain
    // If they are not in enterprise, use their store as well
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUser) {
    return await this.userService.createUser(user);
  }

  @Put()
  async updateUser(@Body() user: UpdateUser) {
    return await this.userService.updateUser(user);
  }

  // Guard
  @Delete()
  async deleteUser(@Param() userId: number) {
    // return await this.userService.deleteUser(userId);
  }
}
