import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { PermissionType } from './permissionType';
import { Role } from './role';

@Entity()
export class Permission {
  @PrimaryColumn()
  id: PermissionType;

  @Column()
  name: string;

  @ManyToMany((type) => Role, (role) => role.permissions)
  roles: Role[];
}
