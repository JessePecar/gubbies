import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { PubSub } from 'graphql-subscriptions';
import { ParseIntPipe, BadRequestException } from '@nestjs/common';
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
    return perms;
  }

  @Mutation('upsertRole')
  async upsertRole(@Args('upsertRoleInput') upsertRole: UpsertRoleInput) {
    // If hierarchy tier is 1, then we will not update because it's an admin
    if (upsertRole.hierarchyTier === 1) {
      throw new BadRequestException('Administrators cannot be updated');
    }

    var updatedRole = await this.rolesService.upsertRole(upsertRole);
    console.log(updatedRole);
    pubSub.publish('roleUpdated', { roleUpdated: updatedRole });

    return updatedRole;
  }

  @Subscription('roleUpdated')
  async roleUpdated() {
    return pubSub.asyncIterableIterator('roleUpdated');
  }
}
