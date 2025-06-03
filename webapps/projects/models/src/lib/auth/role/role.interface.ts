import { RolePermission } from '@/models/auth/role';

export interface Role {
  id: number | null;
  name: string;
  hierarchyTier: number;
  rolePermissions: RolePermission[] | null;
}
