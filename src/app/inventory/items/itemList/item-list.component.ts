import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../components/button.component';
import { ItemListService } from './item-list.service';
import { Item } from '../../models/items';
import { MatIconModule } from '@angular/material/icon';
import { UnitOfMeasurementType } from '../../models/unitOfMeasurementType';

@Component({
  selector: 'app-item-list',
  imports: [ButtonComponent, MatIconModule],
  template: `<div class="flex justify-center items-center w-full h-full">
    <div class="h-3/4 w-3/4">
      <div
        class="h-3/4 h-3/4 border border-stone-900 rounded-lg shadow-lg overflow-hidden">
        <!-- Toolbar will go here -->
        <div class="bg-violet-500 p-1 flex justify-between shadow-lg mb-2">
          <p>Toolbar is here</p>
          <app-button text="Add Item" />
        </div>
        <div class="w-full overflow-y-auto h-full p-1 px-2">
          <div class="h-full">
            @for (item of items(); track $index) {
              <div
                class="even:bg-stone-900 odd:border odd:border-stone-900 bg-stone-800 rounded shadow-lg border-stone-800 mb-1">
                <div class="grid grid-cols-8">
                  <div class="col-span-3">
                    <p class="p-2">{{ item.name }}</p>
                    <p class="text-sm p-2">{{ item.category.name }}</p>
                  </div>
                  <div class="flex col-span-2">
                    <p class="py-2 pr-1">{{ item.quantityOnHand }}</p>
                    <p class="py-2 ">{{ getUnitOfMeasurementType(item) }}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="p-2">
                      Regular Price: {{ getItemPrice(item.basePrice) }}
                    </p>
                    <!-- Will have a green price if on sale, red price if the price is higher than normal  -->
                    <span class="flex p-2 space-x-1">
                      <p>Current Price:</p>
                      <p
                        [class]="
                          '' +
                          (item.currentPrice < item.basePrice
                            ? 'text-green-300'
                            : item.currentPrice > item.basePrice
                              ? 'text-red-300'
                              : '')
                        ">
                        {{ getItemPrice(item.currentPrice) }}
                      </p>
                    </span>
                  </div>
                  <div class="p-2 flex justify-end">
                    <app-button><mat-icon fontIcon="more_vert" /></app-button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class ItemListComponent {
  items = signal<Item[] | undefined>(undefined);

  constructor(service: ItemListService) {
    service.getItems().subscribe(res => {
      this.items.set(res);
    });
  }

  getUnitOfMeasurementType(item: Item) {
    try {
      return UnitOfMeasurementType[item.unitOfMeasurementType];
    } catch {
      return 'EA';
    }
  }

  getItemPrice(price: number) {
    if (price) {
      return `$${parseFloat(price + '').toFixed(2)}`;
    }
    return '';
  }
}
