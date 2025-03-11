import { Address, Phone } from '.';
import { Role } from '../roles';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  roleId: number;
  userName: string;
  password: string;

  role: Role;
  primaryPhone?: Phone;
  address?: Address;
}
