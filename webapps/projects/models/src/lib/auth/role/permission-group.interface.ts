import { Permission } from '@/models/auth/role';

export interface PermissionGroup {
  id: number;
  name: string;
  permissions: Permission[];
}
