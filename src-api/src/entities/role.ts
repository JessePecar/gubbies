import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Permission } from './permission';
import { RolePermission } from './rolePermissions';

@Entity('Roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => User, (user) => user.role)
  @JoinTable({
    joinColumn: { name: 'id', referencedColumnName: 'roleId' },
  })
  users: User[];

  @OneToMany((type) => RolePermission, (perm) => perm.role, {
    nullable: true,
  })
  @JoinTable()
  permissions: RolePermission[];
}
