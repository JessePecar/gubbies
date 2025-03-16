import { Args, Query, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { PubSub } from 'graphql-subscriptions';
import { ParseIntPipe } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver('Roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  // Get all users, no filter will be given (filter endpoint is something that will come later)
  @Query('roles')
  async getItems() {
    return this.rolesService.getRoles();
  }

  @Query('role')
  async getRoleById(@Args('id', ParseIntPipe) id: number) {
    return this.rolesService.getRole(id);
  }
}
