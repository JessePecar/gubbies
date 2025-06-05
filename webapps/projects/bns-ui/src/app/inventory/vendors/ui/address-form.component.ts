import { TextInputComponent } from '@/core/components';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VendorStoreService } from '@/inventory/vendors/store';
import { AddressSchema, FormHandler, YupFormControls } from '@/core/validators';

@Component({
  selector: 'vendor-address-form',
  imports: [TextInputComponent, ReactiveFormsModule],
  template: `
    <div [formGroup]="vendorStore.form">
      <form formGroupName="address" class="mb-4">
        <p class="text-lg mb-1">Vendor Address</p>
        <div class="grid grid-cols-4 gap-2">
          <div class="col-span-2">
            <app-text-input
              [inputProps]="{ required: true }"
              formControlName="address1"
              label="Address Line 1" />
            <small> {{ getError('address1') }} </small>
          </div>
          <div class="col-span-2">
            <app-text-input formControlName="address2" label="Address Line 2" />
            <small> {{ getError('address2') }} </small>
          </div>
          <div>
            <app-text-input
              [inputProps]="{ required: true }"
              formControlName="city"
              label="City" />
            <small> {{ getError('city') }} </small>
          </div>
          <div>
            <app-text-input
              [inputProps]="{ required: true }"
              formControlName="state"
              label="State" />
            <small> {{ getError('state') }} </small>
          </div>
          <div>
            <app-text-input
              [inputProps]="{ required: true }"
              formControlName="countryCode"
              label="Country Code" />
            <small> {{ getError('countryCode') }} </small>
          </div>
          <div>
            <app-text-input
              [inputProps]="{ required: true }"
              formControlName="postalCode"
              label="Postal Code" />
            <small> {{ getError('postalCode') }} </small>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: `
    small {
      color: var(--color-red-400);
    }
  `,
})
export class AddressFormComponent {
  vendorStore = inject(VendorStoreService);

  getError(controlName: keyof AddressSchema & string) {
    return FormHandler.getControlsError(
      this.vendorStore.form.get('address') as FormGroup<
        YupFormControls<AddressSchema>
      >,
      controlName
    );
  }
}
