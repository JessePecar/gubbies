import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Permission } from './permission';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne((type) => User, (user) => user.role)
  user: User;

  @ManyToMany((type) => Permission, (perm) => perm.roles, { nullable: true })
  permissions: Permission[];
}
