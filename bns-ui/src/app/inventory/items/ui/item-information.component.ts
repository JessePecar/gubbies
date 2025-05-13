import { Component, inject } from '@angular/core';
import { ItemStoreService } from '@/inventory/items/store';
import { CardModule } from '@/components/card';
import { ButtonComponent } from '@/components/buttons';
import { Router } from '@angular/router';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';

@Component({
  selector: 'app-item-information',
  imports: [CardModule, ButtonComponent, FooterButtonsComponent],
  template: `
    <card>
      <card-header>
        <p>Item Information</p>
      </card-header>
      <card-body>
        <!-- Form fields for item information -->
      </card-body>
      <card-footer>
        <footer-buttons [canSubmit]="true" nextStep="vendor" />
      </card-footer>
    </card>
  `,
  styles: ``,
})
export class ItemInformationComponent {
  itemStore = inject(ItemStoreService);
  router = inject(Router);
}
