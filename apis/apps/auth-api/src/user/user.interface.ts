export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  roleId: number;
  primaryPhoneId: number;
  addressId: number;
  isActive: boolean;
  emailAddress?: string;
  applicationId: number;
  isEnterpriseMode: boolean;

  //TODO: Add navigation properties
}
