import { CardModule } from '@/components/card';
import { Component, inject } from '@angular/core';
import { ItemStoreService } from './item-store.service';

@Component({
  selector: 'app-item-location',
  imports: [CardModule],
  template: `
    <card>
      <card-header>
        <p>Location</p>
      </card-header>
      <card-body>
        <!-- Form fields for item location -->
      </card-body>
    </card>
  `,
  styles: ``,
})
export class ItemLocationComponent {
  itemStore = inject(ItemStoreService);
}
