import { Address, Phone } from '@core/interfaces';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class User {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;

  @IsNotEmpty()
  roleId: number;

  @IsNotEmpty({
    message: 'User Active status must be provided',
  })
  isActive: boolean;

  @IsNotEmpty({
    message: 'Application id must be provided',
  })
  applicationId: number;

  @IsNotEmpty({
    message: 'Enterprise mode flag must be provided',
  })
  isEnterpriseMode: boolean;

  @IsNotEmptyObject(
    {
      nullable: false,
    },
    {
      message: 'Primary phone must be provided',
    },
  )
  primaryPhone: Phone;

  @IsNotEmptyObject(
    {
      nullable: false,
    },
    {
      message: 'Address must be provided',
    },
  )
  address: Address;
}

export class CreateUser extends User {
  @IsNotEmpty({
    message: 'When creating a user, username should be given',
  })
  username: string;

  @IsNotEmpty({
    message: 'When creating a user, password should be given',
  })
  password: string;
}

export class UpdateUser extends User {
  @IsNotEmpty({
    message: 'Id must be provided for updating a user',
  })
  id: number;

  @IsNotEmpty({
    message: 'Primary Phone Id must be provided when updating a user',
  })
  primaryPhoneId: number;

  @IsNotEmpty({
    message: 'Address Id must be provded when updating a user',
  })
  addressId: number;
}
