import { Item } from '@/inventory/models/items';
import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ItemStoreService {
  formBuilder = inject(FormBuilder);

  createForm(item?: Item) {}
}
