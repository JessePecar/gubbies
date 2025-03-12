import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ParseIntPipe } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { UpdateUserInput } from 'src/graphql.schema';

const pubSub = new PubSub();

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Get all users, no filter will be given (filter endpoint is something that will come later)
  @Query('users')
  async getItems() {
    return this.usersService.getUsers();
  }

  // Get a user by their user id
  @Query('user')
  async getItemById(@Args('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserById(id);
  }

  // Authenticate the user (this is not something that I would keep as a username/password endpoint
  // and would usually have tokenization with claims that came from external auth)
  @Query('auth')
  async authUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.usersService.authUser(username, password);
  }

  // Update the user, will add phone and address if they do not exist already
  @Mutation('updateUser')
  async updateUser(@Args('updateUserInput') updatedUser: UpdateUserInput) {
    await this.usersService.updateUser(updatedUser);
    pubSub.publish('usersChanged', updatedUser);
  }

  // Subscribe to a user being changed
  // Client will either add the user to the list of users (or refresh the list)
  // Or they will update the user that was changed
  @Subscription('usersChanged')
  async userChanged() {
    return pubSub.asyncIterableIterator('usersChanged');
  }
}
