import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@/core/components';
import { UserStore } from '@/settings/users/store';

@Component({
  selector: 'address-form',
  imports: [TextInputComponent, ReactiveFormsModule],
  template: `<div [formGroup]="userStore.form">
    <form formGroupName="address" class="mb-4">
      <p class="text-lg mb-1">User Address</p>
      <div class="grid grid-cols-4 gap-2">
        <div class="col-span-2">
          <app-text-input
            [inputProps]="{ required: true }"
            formControlName="address1"
            label="Address Line 1" />
        </div>
        <div class="col-span-2">
          <app-text-input formControlName="address2" label="Address Line 2" />
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
    </form>
  </div>`,
})
export class AddressFormComponent {
  userStore = inject(UserStore);
}
