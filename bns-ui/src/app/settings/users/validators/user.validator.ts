import { inject, Injectable } from '@angular/core';
import {
  AddressSchema,
  AddressValidator,
  passwordValidator,
  PhoneSchema,
  PhoneValidator,
} from '@/common/validators/shared';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';

export interface UserInfoSchema {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  isActive: boolean;
  roleId: number;
  password: string;
  passwordConfirm: string;
}

export type UserSchema =
  | {
      info: UserInfoSchema;
      address: AddressSchema;
      primaryPhone: PhoneSchema;
      secondaryPhone: PhoneSchema;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class UserValidator implements BaseValidator<UserSchema> {
  private readonly addressValidator = inject(AddressValidator);
  private readonly phoneValidator = inject(PhoneValidator);

  validator = yup.object().shape({
    info: yup.object().shape({
      userName: yup.string().required().min(3).max(12),
      firstName: yup.string().required().min(3).max(32),
      lastName: yup.string().required().min(3).max(32),
      emailAddress: yup.string().required().email(),
      isActive: yup.boolean(),
      roleId: yup.number(),
      password: passwordValidator,
      passwordConfirm: yup.string().when('password', password => {
        return yup
          .string()
          .required()
          .equals(password, 'Passwords should match');
      }),
    }),
    address: this.addressValidator.validator,
    primaryPhone: this.phoneValidator.validator,
    secondaryPhone: this.phoneValidator.validator,
  });

  initialData: UserSchema = {
    info: {
      userName: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      isActive: true,
      roleId: 0,
      password: '',
      passwordConfirm: '',
    },
    address: this.addressValidator.initialData,
    primaryPhone: this.phoneValidator.initialData,
    secondaryPhone: this.phoneValidator.initialData,
  };
}
