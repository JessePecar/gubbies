import { CardModule } from '@/core/components/card';
import { ItemStore } from '@/inventory/items/store';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DropdownComponent,
  DropdownOption,
  NumberInputComponent,
} from '@/core/components';
import { SwitchInputComponent } from '@/core/components/inputs/switch-input.component';

@Component({
  selector: 'app-item-pricing',
  imports: [
    CardModule,
    FooterButtonsComponent,
    ReactiveFormsModule,
    NumberInputComponent,
    SwitchInputComponent,
    DropdownComponent,
  ],
  template: `<card>
    <card-body>
      <form [formGroup]="itemStore.form">
        <div formGroupName="price" class="grid grid-cols-3 py-2 gap-2">
          <div class="col-span-3">
            <app-number-input label="Price" formControlName="price" />
          </div>
          <app-switch-input
            label="Create an override prrice?"
            formControlName="createOverridePrice" />

          @if (itemStore.form.get('price')?.get('createOverridePrice')?.value) {
            <app-dropdown [options]="dropdownOptions" />

            @switch (getDropdownValue()) {
              @case (1) {
                <app-text-input formControlName="expirationValue" />
              }
              @case (2) {
                <app-number-input formControlName="expirationValue" />
              }
            }
          }
        </div>
      </form>
    </card-body>
    <card-footer>
      <footer-buttons [canSubmit]="true" nextStep="location" />
    </card-footer>
  </card> `,
  styles: ``,
})
export class ItemPricingComponent {
  itemStore = inject(ItemStore);

  dropdownOptions: DropdownOption[] = [
    {
      id: 1,
      name: 'Expire on Date',
    },
    {
      id: 2,
      name: 'Expire on Quantity',
    },
  ];

  getDropdownValue() {
    return (this.itemStore.form.get('price')?.get('expirationType')?.value ??
      1) as number;
  }
}
