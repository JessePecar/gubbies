import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Role } from './role';

@Entity()
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

  @OneToOne((type) => Role, (role) => role.user, {
    createForeignKeyConstraints: true,
  })
  role: Role;
}
