import { Role } from '@/models/auth/role';
import { Address, Phone } from '@/models/core';

export interface User {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  roleId: number;
  isActive: boolean;
  applicationId: number;
  isEnterpriseMode: boolean;
  primaryPhone: Phone;
  address: Address;
  id: number;
  primaryPhoneId: number;
  addressId: number;

  role?: Role;
}
