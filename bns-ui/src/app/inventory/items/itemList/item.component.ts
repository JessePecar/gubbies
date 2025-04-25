import { ContextButtonComponent } from '@/components/buttons';
import { Item } from '@/inventory/models/items';
import { UnitOfMeasurementType } from '@/inventory/models/unitOfMeasurementType';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'item',
  imports: [ContextButtonComponent],
  template: `
    <div
      class="even:bg-primary-dark odd:border odd:border-stone-900 bg-primary border-stone-800 mb-1">
      <div class="grid grid-cols-8">
        <div class="col-span-3">
          <p class="p-2">{{ item().name }}</p>
          <p class="text-sm p-2">{{ item().category.name }}</p>
          <p class="text-sm p-2">{{ item().subcategory?.name }}</p>
          <p class="text-sm p-2">{{ item().family?.name }}</p>
        </div>
        <div class="flex col-span-2">
          <p class="py-2 pr-1">{{ item().quantityOnHand }}</p>
          <p class="py-2 ">{{ getUnitOfMeasurementType() }}</p>
        </div>
        <div class="col-span-2">
          <p class="p-2">Regular Price: {{ getItemPrice(item().basePrice) }}</p>
          <!-- Will have a green price if on sale, red price if the price is higher than normal  -->
          @if (item().basePrice !== item().currentPrice) {
            <div class="w-1/2 flex justify-center">
              <span
                [class]="
                  'font-bold flex p-2 py-1 space-x-1 rounded-full text-black ' +
                  (item().currentPrice < item().basePrice
                    ? 'bg-green-300'
                    : 'bg-red-300')
                ">
                <p>Sale Price:</p>
                <p>
                  {{ getItemPrice(item().currentPrice) }}
                </p>
              </span>
            </div>
          }
        </div>
        <div class="p-2 flex justify-end">
          <context-button [options]="itemContextMenu" />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ItemComponent {
  router = inject(Router);

  item = input.required<Item>();

  onEditItem = async () => {
    await this.router.navigate(['inventory/details'], {
      queryParams: {
        itemId: this.item().id,
      },
    });
  };

  itemContextMenu = [
    {
      name: 'Edit',
      iconName: 'edit',
      onClickEvent: this.onEditItem,
    },
    {
      name: 'Delete',
      iconName: 'delete_forever',
      onClickEvent: this.onDelete,
    },
    { name: 'Retire', iconName: 'auto_delete', onClickEvent: this.onRetire },
  ];

  onRetire() {
    //TODO: Retire the item
  }

  onDelete() {
    //TODO: Delete the item
  }

  getUnitOfMeasurementType() {
    try {
      return UnitOfMeasurementType[this.item().unitOfMeasurementType];
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
