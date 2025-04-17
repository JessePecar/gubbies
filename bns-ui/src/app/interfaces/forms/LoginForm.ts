import { AbstractControl } from '@angular/forms';

export interface LoginForm {
  email: AbstractControl<string | null, string>;
  username: AbstractControl<string | null, string>;
  password: AbstractControl<string | null, string>;
}
