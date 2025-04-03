import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class LoginFormService {
  readonly form = inject(FormBuilder).group({
    email: ['', Validators.required],
    username: [
      '',
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(3),
    ],
    password: [
      '',
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(3),
    ],
  });
}
