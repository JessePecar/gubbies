import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserDetailsService } from './user-details.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@/interfaces/settings/users';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  TextInputComponent,
  ToggleComponent,
  ButtonComponent,
} from '@/components';
import { AddressFormComponent } from './address-form.component';
import { ContactFormComponent } from './contact-form.component';

@Component({
  selector: 'app-user-details',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ToggleComponent,
    AddressFormComponent,
    ContactFormComponent,
  ],
  template: `
    <div class="flex flex-col w-full h-full justify-center items-center">
      <div class="flex w-1/2">
        <p style="font-size: 2rem" class="py-2">Add / Edit User</p>
      </div>
      @if (!userDetailService.isLoading) {
        <form
          class="w-1/2 min-h-96 bg-stone-900 rounded shadow p-4"
          [formGroup]="userDetailService.form"
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
                label="First Name"
                [formItem]="userDetailService.form.get('firstName')" />
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="lastName"
                label="Last Name"
                [formItem]="userDetailService.form.get('lastName')" />
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="userName"
                label="User Name"
                [formItem]="userDetailService.form.get('userName')" />
              <app-text-input
                [inputProps]="{ required: true, type: 'email' }"
                formControlName="emailAddress"
                label="Email Address"
                [formItem]="userDetailService.form.get('emailAddress')" />
            </div>
          </div>
          <address-form />
          <contact-form formGroupName="primaryPhone" />
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

  ngOnInit(): void {
    this.userDetailService.populateForm(this.userId());

    console.log(this.userDetailService.form);
  }

  onSubmit() {
    console.log(this.userDetailService.form);
    if (
      this.userDetailService.form !== undefined &&
      this.userDetailService.form.valid
    ) {
      this.userDetailService.updateUser(
        this.userDetailService.form?.value,
        this.currentUser()?.id ?? 0,
        this.currentUser()?.roleId ?? 1,
        this.currentUser()?.password ?? 'password'
      );
    }
  }
}
