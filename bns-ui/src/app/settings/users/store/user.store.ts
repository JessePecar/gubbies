import { CreateUser, Phone, User } from '@/interfaces/settings/users';
import {
  AddressValidator,
  FormHandler,
  PhoneValidator,
  YupFormControls,
} from '@/common/validators';
import {
  UserInfoSchema,
  UserSchema,
  UserValidator,
} from '@/settings/users/validators';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetRolesService } from '@/settings/roles';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly userValidator = inject(UserValidator);
  private readonly addressValidator = inject(AddressValidator);
  private readonly phoneValidator = inject(PhoneValidator);
  private readonly getRolesService = inject(GetRolesService);

  form: FormGroup<YupFormControls<UserSchema>>;

  constructor() {
    const formData: UserSchema = this.userValidator.initialData;
    this.userValidator.isEdit.set(false);

    this.form = FormHandler.formControls<UserSchema>(formData);

    this.form.setValidators(
      FormHandler.validate<UserSchema>(this.userValidator.validator)
    );
  }

  populateForm(user: UserSchema) {
    this.userValidator.isEdit.set(true);

    this.form = FormHandler.formControls<UserSchema>(user);
    this.form.setValidators(
      FormHandler.validate<UserSchema>(
        this.userValidator.userValidator().validator
      )
    );
  }

  getRolesForDropdown() {
    return this.getRolesService.watch().valueChanges;
  }

  // This is done for edit when we get the user object from the api
  // We will not add the password fields for the edit component
  convertToSchema(user: User) {
    return {
      info: {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        isActive: user.isActive,
        lastName: user.lastName,
        roleId: user.roleId,
        userName: user.userName,
      } as UserInfoSchema,
      address: this.addressValidator.convertToSchema(user.address!),
      primaryPhone: this.phoneValidator.convertToSchema(user.primaryPhone!),
    } as UserSchema;
  }

  schemaToCreateObject(user: UserSchema) {
    return {
      ...user.info,
      address: {
        ...user.address,
        postalCode: +user.address.postalCode,
      },
      primaryPhone: {
        ...user.primaryPhone,
        nationalDigits: `+1${user.primaryPhone.rawDigits}`,
      } as Phone,
    } as CreateUser;
  }
}
