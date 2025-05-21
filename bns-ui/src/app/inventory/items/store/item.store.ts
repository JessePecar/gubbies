import { BaseStore } from '@/common/store/base.store';
import { Item, CreateItemInput } from '@/interfaces';
import {
  BaseItemSchema,
  ItemSchema,
  ItemValidator,
} from '@/inventory/items/validators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemStore extends BaseStore<
  ItemSchema, // Schema
  ItemValidator, // Validator
  Item, // Query Object
  CreateItemInput // Post Object
> {
  constructor(private itemValidator: ItemValidator) {
    super(itemValidator);
  }

  override schemaToCreateObject(formData: ItemSchema): CreateItemInput {
    const baseData = formData as BaseItemSchema;
    return {
      basePrice: baseData.price.price,
    } as CreateItemInput;
  }

  override dataObjectToSchema(data: Item): ItemSchema {
    return {} as ItemSchema;
  }
}
