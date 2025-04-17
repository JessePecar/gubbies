import { Permission } from '@/interfaces/settings/roles/Permission';

export interface PermissionGroup {
  id: number;
  name: string;
  permissions: Permission[];
}
