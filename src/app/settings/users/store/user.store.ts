import { CreateUser, Phone } from '@/interfaces/settings/users';
import { FormHandler, YupFormControls } from '@/common/validators';
import { UserSchema, UserValidator } from '@/settings/users/validators';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetRolesService } from '@/settings/roles';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly userValidator = inject(UserValidator);
  private readonly getRolesService = inject(GetRolesService);

  form: FormGroup<YupFormControls<UserSchema>>;

  constructor() {
    const formData: UserSchema = this.userValidator.initialData;

    this.form = FormHandler.formControls<UserSchema>(formData);
    this.form.setValidators(
      FormHandler.validate<UserSchema>(this.userValidator.validator)
    );
  }

  populateForm(user: UserSchema) {
    this.form = FormHandler.formControls<UserSchema>(user);
    this.form.setValidators(
      FormHandler.validate<UserSchema>(this.userValidator.validator)
    );
  }

  getRolesForDropdown() {
    return this.getRolesService.watch().valueChanges;
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
