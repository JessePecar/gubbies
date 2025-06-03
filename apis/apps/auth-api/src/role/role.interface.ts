export class Role {
  id: number | null;
  name: string;
  hierarchyTier: number;
  rolePermissions: RolePermission | null;
}

export class RolePermission {
  permissionId: number;
}
