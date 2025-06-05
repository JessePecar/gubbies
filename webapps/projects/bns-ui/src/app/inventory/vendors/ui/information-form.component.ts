import { Component, inject } from '@angular/core';
import { VendorStoreService } from '@/inventory/vendors/store';
import { TextInputComponent } from '@/core/components';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'vendor-information-form',
  imports: [TextInputComponent, ReactiveFormsModule],
  template: `
    <div [formGroup]="vendorStore.form">
      <form formGroupName="info" class="mb-4">
        <p class="text-lg mb-1">Vendor Information</p>
        <div class="grid grid-cols-4 gap-2">
          <div class="col-span-2">
            <app-text-input
              [inputProps]="{ required: true }"
              formControlName="name"
              label="Name" />
          </div>

          <div class="col-span-4">
            <app-text-input
              [inputProps]="{ required: true, isTextArea: true }"
              formControlName="notes"
              label="Notes" />
          </div>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class InformationFormComponent {
  vendorStore = inject(VendorStoreService);
}
