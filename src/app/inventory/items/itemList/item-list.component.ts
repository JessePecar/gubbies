import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../components/button.component';
import { ItemListService } from './item-list.service';
import { Item } from '../../models/items';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-list',
  imports: [ButtonComponent, MatIconModule],
  template: `<div class="flex justify-center items-center w-full h-full">
    <div class="h-3/4 w-3/4">
      <div class="pb-4 flex justify-end px-1">
        <app-button buttonType="raised" text="Add Item" />
      </div>
      <div class="h-3/4 h-3/4 bg-stone-900 rounded-lg">
        <div class="p-4 bg-stone-900 rounded-lg shadow-lg">
          <div class="p-4 w-full">
            <table
              class="table-fixed w-full bg-stone-800 rounded max-h-96 overflow-y-auto">
              <thead
                class="bg-stone-900 border-b border-stone-700 shadow-lg divide-x divide-stone-700">
                <th class="text-lg px-2 text-start w-1/5">Category</th>
                <th class="text-lg px-2 text-start w-1/4">Name</th>
                <th class="text-lg px-2 text-start">Quantity on Hand</th>
                <th class="text-lg px-2 text-start">Unit of Measurement</th>
                <th class="w-10"></th>
              </thead>
              <tbody class="mt-2 divide-y divide-stone-700">
                @for (item of items(); track $index) {
                  <tr class="even:bg-stone-900">
                    <td class="p-2">{{ item.category.name }}</td>
                    <td class="p-2">{{ item.name }}</td>
                    <td class="p-2">{{ item.quantityOnHand }}</td>
                    <td class="p-2">{{ item.unitOfMeasurementType }}</td>
                    <td class="p-2">
                      <app-button>
                        <div class="text-gray-200 flex w-full justify-start">
                          <mat-icon fontIcon="more_vert" />
                        </div>
                      </app-button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
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
}
