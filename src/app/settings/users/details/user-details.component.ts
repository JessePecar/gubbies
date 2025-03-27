import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserDetailsService } from './user-details.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '@/interfaces/settings/users';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent, ToggleComponent } from '@/components';
import { AddressFormComponent } from './address-form.component';
import { ContactFormComponent } from './contact-form.component';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent, DropdownOption } from '@/components/inputs';
import { ButtonComponent } from '@/components/buttons';

@Component({
  selector: 'app-user-details',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ToggleComponent,
    AddressFormComponent,
    ContactFormComponent,
    MatIconModule,
    DropdownComponent,
  ],
  template: `
    <div
      class="flex flex-col w-full h-full justify-center items-center pr-2 lg: pr-0">
      <div class="flex w-1/2">
        <p style="font-size: 2rem" class="py-2">Add / Edit User</p>
      </div>
      @if (!userDetailService.isLoading) {
        <form
          class="w-full lg:w-1/2 min-h-96 bg-stone-900 rounded shadow p-4"
          [formGroup]="userDetailService.form"
          (ngSubmit)="onSubmit()">
          <div class="py-4 flex justify-end space-x-8">
            <div class="flex justify-center items-center space-x-4">
              <app-toggle formControlName="isActive" />
              <label for="is-active-checkbox">Is Active</label>
            </div>
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
              <app-dropdown
                [options]="roles()"
                label="Role"
                formControlName="roleId" />
            </div>
          </div>
          <address-form />
          <contact-form formGroupName="primaryPhone" />
          <div class="flex justify-end space-x-4">
            <app-button
              (handleClick)="onCancel()"
              buttonType="outline"
              text="Cancel" />

            <app-button buttonType="raised" text="Submit"> </app-button>
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

  roles = signal<DropdownOption[]>([]);
  ngOnInit(): void {
    this.userDetailService.populateForm(this.userId());
    this.userDetailService
      .getRolesForDropdown()
      .subscribe(({ data: { roles } }) => {
        this.roles.set(roles);
      });
  }

  onSubmit() {
    if (
      this.userDetailService.form !== undefined &&
      this.userDetailService.form.valid
    ) {
      this.userDetailService.updateUser(this.userDetailService.form?.value);
    }
  }

  onCancel() {
    this.userDetailService.router.navigate(['settings/users/list']);
  }
}
