import { BaseStore } from '@/common/store/base.store';
import { Item } from '@/inventory/items/interfaces/items';
import { ItemSchema, ItemValidator } from '@/inventory/items/validators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemStore extends BaseStore<ItemSchema, ItemValidator, Item> {
  constructor(private itemValidator: ItemValidator) {
    super(itemValidator);
  }

  override schemaToCreateObject(formData: ItemSchema): Item {
    throw new Error('Method not implemented.');
  }
}
