import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { TextInputComponent } from '../components/text-input.component';
import { SampleLogins } from '../sampleData/sampleLogins';
import { UserInfoService } from '../services/UserInfoService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatRippleModule,
    MatCardModule,
    ReactiveFormsModule,
    TextInputComponent,
  ],
  template: `
    <div class="flex flex-col justify-center items-center h-full px-20">
      <mat-card class="w-full" appearance="raised">
        <div class="flex flex-col items-center justify-center">
          <!-- <h1 class="logo text-[6rem] italic text-gray-100 font-bold">Gubbies</h1>
              <p class="logo text-[1rem] italic text-gray-100 font-bold mt-[-2rem] mb-4">
                Inventory Management System
              </p> -->
          <img alt="Gubbies" src="../../assets/Gubbies IMS.PNG" />
        </div>
        <mat-card-content>
          <div class="w-full flex flex-col justify-between items-center p-4">
            @if (showErrorMessage) {
              <div class="bg-red-900 rounded-xl px-2 py-4 mb-4">
                <p class="text-red-200 ">
                  Incorrect username or password, please try again!
                </p>
              </div>
            }
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="flex flex-col">
                <app-text-input label="Username" formControlName="username" />

                <app-text-input
                  label="Password"
                  formControlName="password"
                  [inputProps]="{ type: 'password' }" />
              </div>
            </form>
          </div>
        </mat-card-content>
        <mat-card-footer>
          <div class="flex justify-end p-4">
            <button
              matRipple
              [matRippleDisabled]="!form.valid"
              matRippleColor="#44444444"
              class="text-gray-600 disabled:text-gray-400 disabled:bg-gray-300 disabled:cursor-default cursor-pointer font-bold bg-gray-200 rounded-full px-4 py-1"
              [disabled]="!form.valid"
              type="button"
              (click)="onSubmit()">
              Submit
            </button>
          </div>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: `
    .logo {
      font-family: 'helvetica';
    }
  `,
})
export class LoginComponent {
  userInfoService: UserInfoService;
  router: Router;

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
    this.userInfoService = inject(UserInfoService);
    this.router = inject(Router);

    // Subscribe to the form to reset show error message whenever the change is made
    this.form.valueChanges.subscribe(() => {
      if (this.showErrorMessage) {
        this.showErrorMessage = false;
      }
    });
  }

  onSubmit() {
    // Grab the value of the form for compare
    const { username, password } = this.form.value;

    // Grab the first login from the sample logins that match in the list of sample users
    const login = SampleLogins.find(
      sl => sl.username === username && sl.password === password
    );

    if (login === undefined) {
      // Show the error message if the login was not found (the login information does not exist)
      this.showErrorMessage = true;
    } else {
      this.userInfoService.setUser(login);
      this.router.navigate(['']);

      console.log('Successful login!');
    }
  }
}
