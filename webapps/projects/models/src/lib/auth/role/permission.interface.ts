import { RolePermission } from './role-permission.interface';

export interface Permission {
  id: number;
  name: string;

  rolePermissions: RolePermission[];
}
