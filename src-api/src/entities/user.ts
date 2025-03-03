import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Role } from './role';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  roleId!: number;

  @Column()
  userName!: string;

  @Column()
  password!: string;

  @ManyToOne((type) => Role)
  @JoinTable()
  role: Role;
}
