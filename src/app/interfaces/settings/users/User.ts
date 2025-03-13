import { Address, Phone } from '.';
import { Role } from '../roles';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  roleId: number;
  userName: string;
  password: string;
  emailAddress: string;
  isActive: boolean;

  role: Role;
  primaryPhone?: Phone;
  address?: Address;
}
