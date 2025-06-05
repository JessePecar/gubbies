import { DropdownOption } from '@/core/components';
import { ButtonComponent } from '@/core/components/buttons';
import { UserDetailsService } from '@/settings/users/details';
import {
  AddressFormComponent,
  ContactFormComponent,
  InformationFormComponent,
} from '@/settings/users/ui';
import {
  Component,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SwitchInputComponent } from '@/core/components/inputs';
import { UserStore } from '@/settings/users/store';
import { User } from '@/models/auth/user';

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
        <p style="font-size: 2rem" class="py-2"><strong>Edit User</strong></p>
      </div>
      @if (userStore.form) {
        <form
          class="w-full lg:w-1/2 min-h-96 p-4"
          [formGroup]="userStore.form"
          (ngSubmit)="onSubmit()">
          <div class="py-4 flex justify-end space-x-8">
            <div formGroupName="info">
              <app-switch-input label="Is Active" formControlName="isActive" />
            </div>
          </div>
          <information-form [roles]="roles()" />
          <address-form />
          <contact-form />
          <div class="flex justify-end space-x-4">
            <app-button
              (handleClick)="onCancel()"
              buttonType="text"
              text="Cancel" />

            <app-button
              (handleClick)="onSubmit()"
              [disabled]="!userStore.form.valid"
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

  // This is a route variable that will be required for this page
  userId = input<number | undefined>();

  currentUser = signal<User | undefined>(undefined);

  roles = signal<DropdownOption[]>([]);

  constructor() {
    effect(() => {
      const userId = this.userId();

      untracked(() => {
        if (userId !== undefined) {
          this.userDetailService
            .getUser(userId)
            .subscribe(({ data: { user } }) => {
              // Convert api object to the schema object for the form
              const userSchema = this.userStore.convertToSchema(user);
              // Set the schema object to the form validator, will set the form's values
              this.userStore.populateForm(userSchema);
            });
        }
      });
    });

    this.userStore.getRolesForDropdown().subscribe(({ data: { roles } }) => {
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
    console.log('Submitting an update');
    console.log(this.userStore.form);
  }

  onCancel() {
    this.userDetailService.router.navigate(['settings/users/list']);
  }
}
