import { TextInputComponent } from '@/core/components';
import { ButtonComponent } from '@/core/components/buttons';
import {
  CardComponent,
  CardBodyComponent,
  CardFooterComponent,
} from '@/core/components/card';
import { UserInfoService } from '@/core/services/user';
import { Component, inject, input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { E } from '@angular/material/error-options.d-CGdTZUYk';

@Component({
  selector: 'login',
  standalone: true,
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
      <div class="flex flex-col items-center justify-center mb-16 h-64 pt-8">
        <img class="h-64" alt="Gubbies" src="../../assets/logo_primary.png" />
      </div>
      <div class="flex flex-col justify-center items-center px-20">
        <div class="min-w-84 w-full lg:w-1/3">
          <card>
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

  redirectUrl = input('');
  applicationId = input('');

  form: FormGroup = inject(FormBuilder).group({
    username: [
      'admin',
      [Validators.required, Validators.maxLength(12), Validators.minLength(3)],
    ],
    password: [
      'password',
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

    this.loginService.login(username, password).subscribe(({ token }) => {
      // TODO: Setup the process to save the token and then attach on outgoing requests
      if (token === undefined || token === null) {
        // Show the error message if the login was not found (the login information does not exist)
        this.showErrorMessage = true;
      } else {
        // Redirect to the correct application
        if (this.redirectUrl() && this.applicationId()) {
          // Check and set the user's application to the redirect url's applicaiton
          // If everything is all good, redirect to redirectUrl()/callback?token=${token}
          // Else, we have two options, go to their assigned id, or give an error message
        } else {
          // Get the claims then the user's application
          this.loginService.getUserClaims(token).subscribe(claims => {
            // redirect to redirectUrl/callback/token=${token}
            if (claims.applicationId) {
              return this.loginService
                .getRedirectLink(claims.applicationId)
                .subscribe(application => {
                  if (application) {
                    window.location.href = `${application.domain}/login-callback?token=${token}`;
                    return;
                  }

                  this.showErrorMessage = true;
                  return;
                });
            }

            this.showErrorMessage = true;
            return;
          });
        }
      }
    });
  }
}
