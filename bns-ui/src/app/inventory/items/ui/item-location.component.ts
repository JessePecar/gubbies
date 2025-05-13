import { ButtonComponent } from '@/components/buttons';
import { CardModule } from '@/components/card';
import { ItemStoreService } from '@/inventory/items/store';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-item-location',
  imports: [CardModule, ButtonComponent],
  template: `
    <card>
      <card-header>
        <p>Location</p>
      </card-header>
      <card-body>
        <!-- Form fields for item location -->
      </card-body>
      <card-footer>
        <div class="w-full flex justify-end space-x-4 pt-4">
          <app-button
            text="Cancel"
            buttonType="text"
            (handleClick)="onCancel()" />
          <app-button
            [disabled]="!true"
            text="Submit"
            buttonType="raised"
            (handleClick)="onSubmit()" />
        </div>
      </card-footer>
    </card>
  `,
  styles: ``,
})
export class ItemLocationComponent {
  itemStore = inject(ItemStoreService);

  onCancel() {}
  onSubmit() {}
}
