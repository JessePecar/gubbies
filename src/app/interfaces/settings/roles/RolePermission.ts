import { Permission } from './Permission';
import { Role } from './Role';

export interface RolePermission {
  roleId: number;
  permissionId: number;

  role: Role;
  permission: Permission;
}
