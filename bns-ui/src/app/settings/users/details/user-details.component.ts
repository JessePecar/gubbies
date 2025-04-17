import { Component, inject, input, signal } from '@angular/core';
import { UserDetailsService, UserFormGroupNames } from './user-details.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@/interfaces/settings/users';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from '@/components';
import {
  AddressFormComponent,
  ContactFormComponent,
  InformationFormComponent,
} from '@/settings/users/ui';
import { MatIconModule } from '@angular/material/icon';
import { DropdownOption } from '@/components/inputs';
import { ButtonComponent } from '@/components/buttons';

@Component({
  selector: 'app-user-details',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    ToggleComponent,
    AddressFormComponent,
    ContactFormComponent,
    InformationFormComponent,
    MatIconModule,
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
          [formGroup]="userDetailService.form"
          (ngSubmit)="onSubmit()">
          <div class="py-4 flex justify-end space-x-8">
            <div class="flex justify-center items-center space-x-4">
              <app-toggle formControlName="isActive" />
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

            <app-button buttonType="raised" text="Submit"> </app-button>
          </div>
        </form>
      }
    </div>
  `,
})
export class UserDetailsComponent {
  userDetailService = inject(UserDetailsService);
  route = inject(ActivatedRoute);
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
