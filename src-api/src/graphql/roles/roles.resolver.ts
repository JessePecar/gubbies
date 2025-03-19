import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { PubSub } from 'graphql-subscriptions';
import { ParseIntPipe } from '@nestjs/common';
import { UpsertRoleInput } from 'src/graphql.schema';

const pubSub = new PubSub();

@Resolver('Roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  // Get all users, no filter will be given (filter endpoint is something that will come later)
  @Query('roles')
  async getItems() {
    return await this.rolesService.getRoles();
  }

  @Query('role')
  async getRoleById(@Args('id', ParseIntPipe) id: number) {
    return await this.rolesService.getRole(id);
  }

  @Query('roleTiers')
  async getRoleTiers() {
    var tiers = await this.rolesService.getRoleTiers();
    return tiers;
  }

  @Query('permissions')
  async getPermissions() {
    var perms = await this.rolesService.getPermissions();
    console.log(perms);
    return perms;
  }

  @Mutation('upsertRole')
  async upsertRole(@Args('upsertRoleInput') upsertUser: UpsertRoleInput) {
    //TODO: Do some checks on the user so we can't update admin, admin will have a special way of updating in the future

    return await this.rolesService.upsertRole(upsertUser);
  }
}
