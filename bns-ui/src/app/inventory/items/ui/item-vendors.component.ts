import { CardModule } from '@/components/card';
import { Component, inject } from '@angular/core';
import { ItemStoreService } from './item-store.service';

@Component({
  selector: 'app-item-vendors',
  imports: [CardModule],
  template: `
    <card>
      <card-header>
        <p>Vendors</p>
      </card-header>
      <card-body>
        <!-- Form fields for item vendor information -->
        <!-- TODO: Add the vendor work flow that can be updated/added here -->
      </card-body>
    </card>
  `,
  styles: ``,
})
export class ItemVendorsComponent {
  itemStore = inject(ItemStoreService);
}
