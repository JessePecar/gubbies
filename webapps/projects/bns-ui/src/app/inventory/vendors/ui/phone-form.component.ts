import { TextInputComponent } from '@/core/components';
import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorStoreService } from '@/inventory/vendors/store';

@Component({
  selector: 'vendor-phone-form',
  imports: [TextInputComponent, ReactiveFormsModule],
  template: `
    <div [formGroup]="vendorStore.form">
      <p class="text-lg mb-1">Contact Information</p>
      <div class="grid grid-cols-4 gap-2">
        <form formGroupName="primaryPhone" class="mb-4">
          <app-text-input
            [inputProps]="{ required: true }"
            formControlName="rawDigits"
            label="Primary Phone" />
        </form>

        <form formGroupName="secondaryPhone" class="mb-4">
          <app-text-input
            [inputProps]="{ required: true }"
            formControlName="rawDigits"
            label="Secondary Phone" />
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class PhoneFormComponent {
  vendorStore = inject(VendorStoreService);
}
