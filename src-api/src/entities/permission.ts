import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { PermissionType } from './permissionType';
import { Role } from './role';
import { RolePermission } from './rolePermissions';

@Entity('Permissions')
export class Permission {
  @PrimaryColumn()
  id: PermissionType;

  @Column()
  name: string;

  @OneToMany((type) => RolePermission, (perm) => perm.permission, {
    nullable: true,
  })
  @JoinTable()
  permissions: Permission[];
}
