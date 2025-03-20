import { User } from '../users';
import { RolePermission, RolePermissionUpdate } from './RolePermission';

export interface Role extends BaseRole {
  users: User[];
  rolePermissions: RolePermission[];
}

export interface UpdateRole extends BaseRole {
  rolePermissions: RolePermissionUpdate[];
}

export interface BaseRole {
  id: number;
  name: string;
  hierarchyTier: number;
}
