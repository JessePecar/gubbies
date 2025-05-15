import { CardModule } from '@/components/card';
import { ItemStore } from '@/inventory/items/store';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-vendors',
  imports: [CardModule, FooterButtonsComponent, ReactiveFormsModule],
  template: `
    <card>
      <card-body>
        <form [formGroup]="itemStore.form">
          <div
            formGroupName="vendors"
            class="grid grid-cols-3 py-2 gap-2"></div>
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
}
