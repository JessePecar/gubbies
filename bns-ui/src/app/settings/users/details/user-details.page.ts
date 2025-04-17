import { DropdownOption } from '@/components';
import { ButtonComponent } from '@/components/buttons';
import { User } from '@/interfaces/settings/users';
import {
  UserDetailsService,
  UserFormGroupNames,
} from '@/settings/users/details/user-details.service';
import {
  AddressFormComponent,
  ContactFormComponent,
  InformationFormComponent,
} from '@/settings/users/ui';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SwitchInputComponent } from '@/components/inputs/switch-input.component';
import { UserStore } from '@/settings/users/store';

@Component({
  selector: 'app-user-details',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    AddressFormComponent,
    ContactFormComponent,
    InformationFormComponent,
    MatIconModule,
    SwitchInputComponent,
  ],
  template: `
    <div
      class="flex flex-col w-full h-full justify-center items-center pr-2 lg: pr-0">
      <div class="flex w-1/2">
        <p style="font-size: 2rem" class="py-2">Add / Edit User</p>
      </div>
      @if (!userDetailService.isLoading) {
        <form
          class="w-full lg:w-1/2 min-h-96 bg-primary-dark rounded shadow p-4"
          [formGroup]="userStore.form"
          (ngSubmit)="onSubmit()">
          <div class="py-4 flex justify-end space-x-8">
            <div class="flex justify-center items-center space-x-4">
              <app-switch-input formControlName="isActive" />
              <label for="is-active-checkbox">Is Active</label>
            </div>
          </div>
          <information-form [roles]="roles()" />
          <address-form />
          <contact-form />
          <div class="flex justify-end space-x-4">
            <app-button
              (handleClick)="onCancel()"
              buttonType="outline"
              text="Cancel" />

            <app-button
              (handleClick)="onSubmit()"
              buttonType="raised"
              text="Submit">
            </app-button>
          </div>
        </form>
      }
    </div>
  `,
})
export class UserDetailsPage {
  userDetailService = inject(UserDetailsService);
  userStore = inject(UserStore);
  route = inject(Router);
  formBuilder = inject(FormBuilder);

  userId = input<number | undefined>();

  currentUser = signal<User | undefined>(undefined);

  roles = signal<DropdownOption[]>([]);

  constructor() {
    this.userDetailService.populateForm(this.userId());

    this.userDetailService
      .getRolesForDropdown()
      .subscribe(({ data: { roles } }) => {
        this.roles.set(
          roles.map(
            r =>
              ({
                id: r.id,
                name: r.name,
              }) as DropdownOption
          )
        );
      });
  }

  onSubmit() {
    if (
      this.userDetailService.form !== undefined &&
      this.userDetailService.form.valid
    ) {
      this.userDetailService.updateUser(
        this.userDetailService.form?.value as Record<UserFormGroupNames, any>
      );
    }
  }

  onCancel() {
    this.userDetailService.router.navigate(['settings/users/list']);
  }
}
