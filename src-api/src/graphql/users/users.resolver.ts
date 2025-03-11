import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ParseIntPipe } from '@nestjs/common';

// import { PubSub } from 'graphql-subscriptions';
// const pubSub = new PubSub();

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  async getItems() {
    return this.usersService.getUsers();
  }

  @Query('user')
  async getItemById(@Args('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserById(id);
  }

  @Query('auth')
  async authUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.usersService.authUser(username, password);
  }
}
