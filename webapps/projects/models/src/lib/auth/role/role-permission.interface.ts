import { Permission } from '@/models/auth/role';

export interface RolePermission {
  permissionId: number;

  permission: Permission;
}
