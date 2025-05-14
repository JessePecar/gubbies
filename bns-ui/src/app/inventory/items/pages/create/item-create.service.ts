import { ItemStore } from '@/inventory/items/store';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemCreateService {
  itemStore = inject(ItemStore);
  constructor() {}
}
