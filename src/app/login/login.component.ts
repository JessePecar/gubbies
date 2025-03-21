import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { TextInputComponent } from '@/components';
import { UserInfoService } from '../services/userInfo.service';
import { Router } from '@angular/router';
import { UserDataService } from '../services';
import {
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
} from '../components/card/card.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [
    MatRippleModule,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    ReactiveFormsModule,
    TextInputComponent,
  ],
  template: `
    <div class="h-full">
      <div class="flex flex-col items-center justify-center mb-4 h-20 pt-8">
        <img alt="Gubbies" src="../../assets/Gubbies.PNG" />
      </div>
      <div class="flex flex-col justify-center items-center h-3/4 px-20">
        <div class="min-w-84 w-2/3">
          <card appearance="raised">
            <card-body>
              <div class="mb-2 pl-4">
                <p class="text-[3rem]">Sign In</p>
                <p class="text-sm pl-1">
                  If you don't have an account, contact your administrator
                </p>
              </div>

              <div class="w-full flex flex-col justify-between p-4">
                @if (showErrorMessage) {
                  <div class="bg-red-900 rounded-xl px-2 py-4 mb-4">
                    <p class="text-red-200 ">
                      Incorrect username or password, please try again!
                    </p>
                  </div>
                }
                <form [formGroup]="form" (ngSubmit)="onSubmit()">
                  <div class="flex flex-col space-y-4">
                    <app-text-input
                      [inputProps]="{ required: true }"
                      label="Username"
                      formControlName="username" />

                    <app-text-input
                      [required]="true"
                      label="Password"
                      formControlName="password"
                      [inputProps]="{ type: 'password', required: true }" />
                  </div>
                </form>
              </div>
            </card-body>
            <card-footer>
              <div class="flex justify-center w-full p-4 px-8">
                <button
                  matRipple
                  [matRippleDisabled]="!form.valid"
                  matRippleColor="#44444444"
                  class="text-stone-600 disabled:text-stone-400 disabled:bg-stone-300 disabled:cursor-default  font-bold bg-stone-200 rounded-lg px-4 py-1 w-full"
                  [disabled]="!form.valid"
                  type="button"
                  (click)="onSubmit()">
                  Login
                </button>
              </div>
            </card-footer>
          </card>
        </div>
      </div>
    </div>
  `,
  styles: `
    .logo {
      font-family: 'helvetica';
    }
  `,
})
export class LoginComponent {
  userDataService = inject(UserDataService);
  userInfoService = inject(UserInfoService);
  loginService = inject(LoginService);
  router = inject(Router);

  form: FormGroup = inject(FormBuilder).group({
    username: [
      '',
      [Validators.required, Validators.maxLength(12), Validators.minLength(3)],
    ],
    password: [
      '',
      [Validators.required, Validators.maxLength(12), Validators.minLength(3)],
    ],
  });

  showErrorMessage = false;

  constructor() {
    // Subscribe to the form to reset show error message whenever the change is made
    this.form.valueChanges.subscribe(() => {
      if (this.showErrorMessage) {
        this.showErrorMessage = false;
      }
    });
  }

  async onSubmit() {
    // Grab the value of the form for compare
    const { username, password } = this.form.value;

    this.loginService
      .authUser(username, password)
      .subscribe(({ data: { auth } }) => {
        if (auth === undefined || auth === null) {
          // Show the error message if the login was not found (the login information does not exist)
          this.showErrorMessage = true;
        } else {
          this.userInfoService.setUser(auth);
          this.router.navigate(['']);
        }
      });
  }
}
