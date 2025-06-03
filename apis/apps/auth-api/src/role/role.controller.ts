import { Role } from '@auth/role';
import { RoleService } from '@auth/role/role.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @Get('tiers')
  async getTiers() {
    return await this.roleService.getRoleTiers();
  }

  @Get(':id')
  async getRole(@Param('id') id: number) {
    return await this.roleService.getRole(id);
  }

  @Get('permissions')
  async getPermissions() {
    return await this.roleService.getPermissions();
  }

  @Get('permissionGroups')
  async getPermissionGroups() {
    return await this.roleService.getPermissionGroups();
  }

  @Post()
  async createRole(@Body() role: Role) {
    return await this.roleService.upsertRole(role);
  }
}
