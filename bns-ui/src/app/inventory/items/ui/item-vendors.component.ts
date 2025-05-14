import { CardModule } from '@/components/card';
import { ItemStore } from '@/inventory/items/store';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-item-vendors',
  imports: [CardModule, FooterButtonsComponent],
  template: `
    <card>
      <card-header>
        <p>Vendors</p>
      </card-header>
      <card-body>
        <!-- Form fields for item vendor information -->
        <!-- TODO: Add the vendor work flow that can be updated/added here -->
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
