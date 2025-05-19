import { CardModule } from '@/components/card';
import { ItemStore } from '@/inventory/items/store';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { GetVendorsQuery } from '@/inventory/vendors/requests';
import {
  DropdownComponent,
  NumberInputComponent,
  TextInputComponent,
  SwitchInputComponent,
  DropdownOption,
} from '@/components/inputs';
import { ButtonComponent } from '../../../components/buttons/button.component';
import { FormHandler } from '@/common/validators';
import {
  ItemVendorSchema,
  ItemVendorValidator,
} from '@/inventory/items/validators';

@Component({
  selector: 'app-item-vendors',
  imports: [
    CardModule,
    FooterButtonsComponent,
    ReactiveFormsModule,
    DropdownComponent,
    NumberInputComponent,
    TextInputComponent,
    SwitchInputComponent,
    ButtonComponent,
  ],
  template: `
    <div class="py-2 flex justify-start">
      <app-button
        buttonType="default"
        text="Add Vendor"
        icon="add"
        (handleClick)="onAddVendor()" />
    </div>
    @if (itemStore.form; as form) {
      <form class="form-container overflow-y-auto px-1" [formGroup]="form">
        <div formArrayName="vendors">
          @for (vendorItem of vendorItems.controls; track $index) {
            <div
              class="rounded shadow form-item p-2 my-1"
              [formGroupName]="$index">
              <div class="grid grid-cols-3 gap-2 py-2">
                <app-dropdown
                  label="Vendor"
                  formControlName="vendorId"
                  [options]="vendors()" />
                <app-text-input
                  label="Vendor's Id"
                  formControlName="vendorItemId" />

                <app-number-input label="Cost" formControlName="cost" />
                <app-number-input
                  label="Reorder Quantity"
                  formControlName="reorderQuantity" />
              </div>

              <div class="grid grid-cols-4 mt-12 mb-6">
                <app-switch-input
                  label="Preferred Vendor"
                  formControlName="isPreferredVendor" />
                <app-switch-input
                  label="Allow Returning to Vendor"
                  formControlName="canReturn" />
                <app-switch-input
                  label="Auto Replenish from Vendor"
                  formControlName="isAutoReplenish" />
                <app-switch-input
                  label="Allow Promotions from Vendor"
                  formControlName="canPromote" />
              </div>
            </div>
          }
        </div>
      </form>
    }
    <footer-buttons [canSubmit]="true" nextStep="pricing" />
  `,
  styles: `
    .form-container {
      max-height: calc(50vh + 40px);
    }
  `,
})
export class ItemVendorsComponent {
  itemStore = inject(ItemStore);
  itemVendorValidator = inject(ItemVendorValidator);
  vendorsQuery = inject(GetVendorsQuery);

  vendors = signal<DropdownOption[]>([]);

  constructor() {
    this.vendorsQuery.fetch().subscribe(({ data: { vendors } }) => {
      this.vendors.set([{ id: 0, name: '---' }, ...vendors]);
    });
  }

  get vendorItems() {
    return this.itemStore.form.get('vendors') as FormArray;
  }

  isControlPopulated(control: AbstractControl<any, any>, idx: number) {
    console.log(control);
    return !!control.get(`${idx}`);
  }

  // Add new vendor to the list, we will build the from control using the form control handler.
  onAddVendor() {
    const newFormControl = FormHandler.formControls<ItemVendorSchema>(
      this.itemVendorValidator.initialData
    );
    newFormControl.setValidators(
      FormHandler.validate<ItemVendorSchema>(this.itemVendorValidator.validator)
    );
    (this.itemStore.form.get('vendors') as FormArray).push(newFormControl);
  }
}
