import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { TextInputComponent } from '@/components';
import { UserInfoService } from '@/services/';
import { Router } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
} from '../components/card/card.component';
import { LoginService } from './login.service';
import { ButtonComponent } from '@/components/buttons/button.component';

@Component({
  selector: 'app-login',
  imports: [
    MatRippleModule,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    ReactiveFormsModule,
    TextInputComponent,
    ButtonComponent,
  ],
  template: `
    <div class="h-full">
      <div class="flex flex-col items-center justify-center mb-4 h-20 pt-8">
        <img alt="Gubbies" src="../../assets/Gubbies.PNG" />
      </div>
      <div class="flex flex-col justify-center items-center h-3/4 px-20">
        <div class="min-w-84 w-full lg:w-1/3">
          <card appearance="raised">
            <card-body>
              <div class="px-0 lg:px-10 mb-2 pl-4">
                <p class="text-[3rem]">Sign In</p>
                <p class="text-sm pl-1">
                  If you don't have an account, contact your administrator
                </p>
              </div>

              <div
                class="px-0 lg:px-10 w-full flex flex-col justify-between p-4">
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
                      tabindex="1"
                      [inputProps]="{ required: true }"
                      label="Username"
                      formControlName="username" />

                    <app-text-input
                      tabindex="2"
                      [required]="true"
                      label="Password"
                      formControlName="password"
                      [inputProps]="{ type: 'password', required: true }" />
                  </div>
                </form>
              </div>
            </card-body>
            <card-footer>
              <div class="flex justify-between w-full p-4 px-8 space-x-2">
                <app-button
                  color="secondary"
                  buttonType="text"
                  contentType="min-content"
                  text="Forgot Password"
                  (handleClick)="onSubmit()" />

                <app-button
                  tabindex="3"
                  class="w-full lg:w-1/2"
                  color="primary"
                  buttonType="raised"
                  contentType="full-center"
                  text="Login"
                  (handleClick)="onSubmit()"
                  [disabled]="!form.valid" />
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

    this.loginService.authUser(username, password).subscribe(
      ({
        data: {
          login: { accessToken, user },
        },
      }) => {
        // TODO: Setup the process to save the token and then attach on outgoing requests
        if (user === undefined || user === null) {
          // Show the error message if the login was not found (the login information does not exist)
          this.showErrorMessage = true;
        } else {
          this.userInfoService.setUser(accessToken, user);
          this.router.navigate(['']);
        }
      }
    );
  }
}
