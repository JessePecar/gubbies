/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { PubSub } from 'graphql-subscriptions';
import { ParseIntPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { UpsertRoleInput } from '@bns/graphql.schema';
import { AppAuthGuard } from '@core/guards';

const pubSub = new PubSub();

@Resolver('Roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  // Get all users, no filter will be given (filter endpoint is something that will come later)
  @UseGuards(AppAuthGuard)
  @Query('roles')
  async getItems() {
    // return await this.rolesService.getRoles();
  }

  @UseGuards(AppAuthGuard)
  @Query('role')
  async getRoleById(@Args('id', ParseIntPipe) id: number) {
    // return await this.rolesService.getRole(id);
  }

  @UseGuards(AppAuthGuard)
  @Query('roleTiers')
  async getRoleTiers() {
    // const tiers = await this.rolesService.getRoleTiers();
    // return tiers;
  }

  @UseGuards(AppAuthGuard)
  @Query('permissions')
  async getPermissions() {
    // const perms = await this.rolesService.getPermissions();
    // return perms;
  }

  @UseGuards(AppAuthGuard)
  @Query('permissionGroups')
  async getPermissionGroups() {
    // const perms = await this.rolesService.getPermissionGroups();
    // return perms;
  }

  @UseGuards(AppAuthGuard)
  @Mutation('upsertRole')
  async upsertRole(@Args('upsertRoleInput') upsertRole: UpsertRoleInput) {
    // // If hierarchy tier is 1, then we will not update because it's an admin
    // if (upsertRole.hierarchyTier === 1) {
    // throw new BadRequestException('Administrators cannot be updated');
    // }
    // const updatedRole = await this.rolesService.upsertRole(upsertRole);
    // console.log(updatedRole);
    // await pubSub.publish('roleUpdated', { roleUpdated: updatedRole });
    // return updatedRole;
  }

  @Subscription('roleUpdated')
  roleUpdated() {
    // return pubSub.asyncIterableIterator('roleUpdated');
  }
}
