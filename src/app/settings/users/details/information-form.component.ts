import {
  DropdownComponent,
  DropdownOption,
  TextInputComponent,
} from '@/components';
import { Component, inject, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsService } from './user-details.service';

@Component({
  selector: 'information-form',
  imports: [ReactiveFormsModule, TextInputComponent, DropdownComponent],
  template: `
    <div [formGroup]="userDetailsService.form">
      <form formGroupName="info" class="mb-4">
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
          <app-dropdown
            [options]="roles()"
            label="Role"
            formControlName="roleId" />
        </div>
      </form>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InformationFormComponent,
    },
  ],
})
export class InformationFormComponent {
  userDetailsService = inject(UserDetailsService);
  roles = input.required<DropdownOption[]>();
}
