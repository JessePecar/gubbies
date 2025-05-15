import { DropdownComponent, DropdownOption } from '@/components';
import { CardModule } from '@/components/card';
import { ItemStore } from '@/inventory/items/store';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';
import { GetVendorsQuery } from '@/inventory/vendors/requests';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-vendors',
  imports: [
    CardModule,
    FooterButtonsComponent,
    ReactiveFormsModule,
    DropdownComponent,
  ],
  template: `
    <card>
      <card-body>
        <form [formGroup]="itemStore.form">
          <div formGroupName="vendors" class="grid grid-cols-3 py-2 gap-2">
            <!-- dropdown - vendorId -->
            <app-dropdown formControlName="vendorId" [options]="vendors()" />
            <!-- text - vendorItemId -->
            <!-- number - cost -->
            <!-- switch - canReturn -->
            <!-- switch - isAutoReplenish -->
            <!-- switch - isPreferredVendor -->
            <!-- switch - canPromote -->
            <!-- number - reorderQuantity -->
          </div>
        </form>
      </card-body>
      <card-footer>
        <footer-buttons [canSubmit]="true" nextStep="pricing" />
      </card-footer>
    </card>
  `,
  styles: ``,
})
export class ItemVendorsComponent {
  itemStore = inject(ItemStore);
  vendorsQuery = inject(GetVendorsQuery);

  vendors = signal<DropdownOption[]>([]);

  constructor() {
    this.vendorsQuery.fetch().subscribe(({ data: { vendors } }) => {
      this.vendors.set([{ id: 0, name: '---' }, ...vendors]);
    });
  }
}
