import { Address, Phone } from '.';
import { Role } from '../roles';

export interface User extends UpdateUser {
  role: Role;
}

export interface UpdateUser {
  id: number;
  firstName: string;
  lastName: string;
  roleId: number;
  primaryPhoneId?: number;
  addressId?: number;
  userName: string;
  password: string;
  emailAddress: string;
  isActive: boolean;

  primaryPhone?: Phone;
  address?: Address;
}
