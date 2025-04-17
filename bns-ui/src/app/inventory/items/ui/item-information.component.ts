import { Component, inject } from '@angular/core';
import { ItemStoreService } from './item-store.service';
import { CardModule } from '@/components/card';

@Component({
  selector: 'app-item-information',
  imports: [CardModule],
  template: `
    <card>
      <card-header>
        <p>Item Information</p>
      </card-header>
      <card-body>
        <!-- Form fields for item information -->
      </card-body>
    </card>
  `,
  styles: ``,
})
export class ItemInformationComponent {
  itemStore = inject(ItemStoreService);
}
