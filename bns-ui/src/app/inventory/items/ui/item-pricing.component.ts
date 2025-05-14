import { CardModule } from '@/components/card';
import { ItemStore } from '@/inventory/items/store';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-item-pricing',
  imports: [CardModule, FooterButtonsComponent],
  template: `<card>
    <card-header>
      <p>Pricing</p>
    </card-header>
    <card-body>
      <!-- Form fields for item pricing -->
    </card-body>
    <card-footer>
      <footer-buttons [canSubmit]="true" nextStep="location" />
    </card-footer>
  </card> `,
  styles: ``,
})
export class ItemPricingComponent {
  itemStore = inject(ItemStore);
}
