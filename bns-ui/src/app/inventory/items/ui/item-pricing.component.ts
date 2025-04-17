import { CardModule } from '@/components/card';
import { Component, inject } from '@angular/core';
import { ItemStoreService } from './item-store.service';

@Component({
  selector: 'app-item-pricing',
  imports: [CardModule],
  template: `<card>
    <card-header>
      <p>Pricing</p>
    </card-header>
    <card-body>
      <!-- Form fields for item pricing -->
    </card-body>
  </card> `,
  styles: ``,
})
export class ItemPricingComponent {
  itemStore = inject(ItemStoreService);
}
