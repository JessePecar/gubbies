import { Permission } from './Permission';
import { Role } from './Role';

export interface RolePermission extends RolePermissionUpdate {
  roleId: number;

  role: Role;
  permission: Permission;
}

export interface RolePermissionUpdate {
  permissionId: number;
}
