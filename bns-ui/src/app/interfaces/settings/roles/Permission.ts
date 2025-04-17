import { RolePermission } from './RolePermission';

export interface Permission {
  id: number;
  name: string;

  rolePermissions: RolePermission[];
}
