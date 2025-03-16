import { User } from '../users';
import { RolePermission } from './RolePermission';

export interface Role {
  id: number;
  name: string;
  hierarchyTier: number;

  rolePermissions: RolePermission[];
  users: User[];
}
