import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../components/button.component';
import { ItemListService } from './item-list.service';
import { Item } from '../../models/items';
import { MatIconModule } from '@angular/material/icon';
import { UnitOfMeasurementType } from '../../models/unitOfMeasurementType';
import { ContextButtonComponent } from '../../../components/context-button.component';
import { Router } from '@angular/router';
import { TableComponent } from '../../../components/tables/table.component';

@Component({
  selector: 'app-item-list',
  imports: [
    ButtonComponent,
    MatIconModule,
    ContextButtonComponent,
    TableComponent,
  ],
  template: `
    <app-table [toolbarItems]="toolbarItems">
      @for (item of items(); track $index) {
        <div
          class="even:bg-stone-900 odd:border odd:border-stone-900 bg-stone-800 border-stone-800 mb-1">
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
              @if (item.basePrice !== item.currentPrice) {
                <div class="w-1/2 flex justify-center">
                  <span
                    [class]="
                      'font-bold flex p-2 py-1 space-x-1 rounded-full text-black ' +
                      (item.currentPrice < item.basePrice
                        ? 'bg-green-300'
                        : 'bg-red-300')
                    ">
                    <p>Sale Price:</p>
                    <p>
                      {{ getItemPrice(item.currentPrice) }}
                    </p>
                  </span>
                </div>
              }
            </div>
            <div class="p-2 flex justify-end">
              <context-button
                [clickParams]="item.id"
                [options]="itemContextMenu" />
            </div>
          </div>
        </div>
      }
    </app-table>
    <!-- <div class="flex justify-center items-center w-full h-full">
      <div class="h-3/4 w-full lg:w-3/4">
        <div
          class="h-3/4 border border-stone-900 rounded-lg shadow-lg overflow-hidden">
          
          <div class="bg-violet-500 p-1 flex justify-end shadow-lg mb-2">
            <app-button>
              <span class="flex p-2">
                <mat-icon fontIcon="add" />
                <p>Add Item</p>
              </span>
            </app-button>
          </div>
          <div class="w-full overflow-y-auto h-full p-1">
            <div class="h-full">
              @for (item of items(); track $index) {
                <div
                  class="even:bg-stone-900 odd:border odd:border-stone-900 bg-stone-800 border-stone-800 mb-1">
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
                      
                      @if (item.basePrice !== item.currentPrice) {
                        <div class="w-1/2 flex justify-center">
                          <span
                            [class]="
                              'font-bold flex p-2 py-1 space-x-1 rounded-full text-black ' +
                              (item.currentPrice < item.basePrice
                                ? 'bg-green-300'
                                : 'bg-red-300')
                            ">
                            <p>Sale Price:</p>
                            <p>
                              {{ getItemPrice(item.currentPrice) }}
                            </p>
                          </span>
                        </div>
                      }
                    </div>
                    <div class="p-2 flex justify-end">
                      <context-button
                        [clickParams]="item.id"
                        [options]="itemContextMenu" />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div> -->
  `,
})
export class ItemListComponent {
  items = signal<Item[] | undefined>(undefined);
  router = inject(Router);

  constructor(service: ItemListService) {
    service.getItems().subscribe(res => {
      this.items.set(res);
    });
  }

  toolbarItems = [
    { icon: 'add', text: 'Add Item', onClick: this.onCreateItem },
  ];

  itemContextMenu = [
    {
      name: 'Edit',
      iconName: 'edit',
      onClickEvent: async (itemId: number) => {
        console.log('Navigating to item page: ' + itemId);
        await this.router.navigate(['inventory/details'], {
          queryParams: {
            itemId: itemId,
          },
        });
      },
    },
    { name: 'Delete', iconName: 'delete_forever', onClickEvent: () => {} },
    { name: 'Retire', iconName: 'auto_delete', onClickEvent: () => {} },
  ];

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

  async onCreateItem() {
    await this.router.navigate(['inventory/details']);
  }
}
