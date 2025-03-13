import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserDetailsService } from './user-details.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@/interfaces/settings/users';
import { TextInputComponent } from '../../../components/text-input.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@/components/button.component';
import { ToggleComponent } from '@/components/toggle.component';

@Component({
  selector: 'app-user-details',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ToggleComponent,
  ],
  template: `
    <div class="flex flex-col w-full h-full justify-center items-center">
      <div class="flex w-1/2">
        <p style="font-size: 2rem" class="py-2">Add / Edit User</p>
      </div>
      @if (form !== undefined) {
        <form
          class="w-1/2 min-h-96 bg-stone-900 rounded shadow p-4"
          [formGroup]="form"
          (ngSubmit)="onSubmit()">
          <div class="py-4 flex justify-end space-x-8">
            <div class="flex justify-center items-center space-x-4">
              <app-toggle formControlName="isActive" />
              <label for="is-active-checkbox">Is Active</label>
            </div>
            <!-- [disabled]="!form.valid" -->
            <app-button buttonType="raised" text="Submit"> </app-button>
          </div>
          <div class="mb-4">
            <p class="text-lg mb-1">Information</p>
            <div class="grid grid-cols-4 gap-2">
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="firstName"
                label="First Name" />
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="lastName"
                label="Last Name" />
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="userName"
                label="User Name" />
              <app-text-input
                [inputProps]="{ required: true, type: 'email' }"
                formControlName="emailAddress"
                label="Email Address" />
            </div>
          </div>
          <div class="mb-4">
            <p class="text-lg mb-1">User Address</p>
            <div class="grid grid-cols-4 gap-2">
              <div class="col-span-2">
                <app-text-input
                  [inputProps]="{ required: true }"
                  formControlName="address1"
                  label="Address Line 1" />
              </div>
              <div class="col-span-2">
                <app-text-input
                  formControlName="address2"
                  label="Address Line 2" />
              </div>
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="city"
                label="City" />
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="state"
                label="State" />
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="countryCode"
                label="Country Code" />
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="postalCode"
                label="Postal Code" />
            </div>
          </div>
          <div class="mb-4">
            <p class="text-lg mb-1">Contact Information</p>
            <div class="grid grid-cols-4 gap-2">
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="primaryPhone"
                label="Primary Phone" />
            </div>
          </div>
        </form>
      }
    </div>
  `,
})
export class UserDetailsComponent implements OnInit {
  userDetailService = inject(UserDetailsService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  userId = input<number | undefined>();

  currentUser = signal<User | undefined>(undefined);

  form?: FormGroup;

  ngOnInit(): void {
    if (this.userId() !== undefined) {
      this.userDetailService
        .getUser(this.userId() as number)
        .subscribe(({ data: { user } }) => {
          this.currentUser.set(user);
          this.buildForm();
        });
    } else {
      this.buildForm();
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      userName: [
        this.currentUser()?.userName,
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(3),
        ],
      ],
      firstName: [
        this.currentUser()?.firstName,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        this.currentUser()?.lastName,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      address1: [
        this.currentUser()?.address?.address1,
        [
          Validators.required,
          Validators.maxLength(64),
          Validators.minLength(2),
        ],
      ],
      address2: [
        this.currentUser()?.address?.address2 ?? '',
        [Validators.nullValidator],
      ],
      city: [
        this.currentUser()?.address?.city,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(2),
        ],
      ],
      state: [
        this.currentUser()?.address?.state,
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(4),
        ],
      ],
      countryCode: [
        this.currentUser()?.address?.countryCode,
        [Validators.required, Validators.maxLength(2), Validators.minLength(2)],
      ],
      postalCode: [
        this.currentUser()?.address?.postalCode,
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      primaryPhone: [
        this.currentUser()?.primaryPhone?.rawDigits,
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      emailAddress: [
        this.currentUser()?.emailAddress,
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      isActive: [this.currentUser()?.isActive ?? true],
    });
  }

  onSubmit() {
    console.log(this.form);
    if (this.form !== undefined && this.form.valid) {
      this.userDetailService.updateUser(
        this.form?.value,
        this.currentUser()?.roleId ?? 1,
        this.currentUser()?.password ?? 'password'
      );
    }
  }
}
