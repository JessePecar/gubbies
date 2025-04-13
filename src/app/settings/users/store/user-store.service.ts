import { CreateUser, Phone } from '@/interfaces/settings/users';
import { FormHandler, YupFormControls } from '@/validators';
import { UserSchema, UserValidator } from '@/validators/user/user.validator';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private readonly userValidator = inject(UserValidator);

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
