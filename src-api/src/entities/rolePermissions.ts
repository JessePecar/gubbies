import { Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Role } from './role';
import { Permission } from './permission';

@Entity('RolePermissions')
export class RolePermission {
  @PrimaryColumn()
  roleId: number;

  @PrimaryColumn()
  permissionId: number;

  @ManyToOne((type) => Role)
  role: Role;

  @ManyToOne((type) => Permission)
  permission: Permission;
}
