import { Role } from '../role';

export class User implements IUser {
  id!: number;
  firstName!: string;
  lastName!: string;
  roleId!: number;
  userName!: string;
  passwordHash!: string;

  role!: Role;

  constructor(user: IUser) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.roleId = user.roleId;
    this.userName = user.userName;
    this.passwordHash = user.passwordHash;
  }
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  roleId: number;
  userName: string;
  passwordHash: string;
}
