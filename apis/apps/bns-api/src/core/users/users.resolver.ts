import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CreateUserInput, UpdateUserInput } from '@bns/graphql.schema';
import { AppAuthGuard } from '@core/guards';

const pubSub = new PubSub();

@UseGuards(AppAuthGuard)
@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Get all users, no filter will be given (filter endpoint is something that will come later)
  @Query('users')
  async getItems() {
    // return this.usersService.getUsers();
  }

  // Get a user by their user id
  @Query('user')
  async getItemById(@Args('id', ParseIntPipe) id: number) {
    // return await this.usersService.getUserById(id);
  }

  // Update the user, will add phone and address if they do not exist already
  @Mutation('updateUser')
  async updateUser(@Args('updateUserInput') updatedUser: UpdateUserInput) {
    // const user = await this.usersService.updateUser(updatedUser);
    // await pubSub.publish('usersChanged', { usersChanged: user });
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') createUser: CreateUserInput) {
    // const user = await this.usersService.createUser(createUser);
    // await pubSub.publish('usersChanged', { usersChanged: user });
  }

  // Subscribe to a user being changed
  // Client will either add the user to the list of users (or refresh the list)
  // Or they will update the user that was changed
  @Subscription('usersChanged')
  userChanged() {
    // return pubSub.asyncIterableIterator('usersChanged');
  }
}
