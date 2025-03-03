import { Permission } from './permission';

export class Role implements IRole {
  // TODO: Add role information that is needed later

  permissions!: Permission[];

  constructor(role?: IRole) {
    this.permissions = role?.permissions ?? [];
  }
}

export interface IRole {
  permissions: Permission[];
}
