import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetItemsQuery } from '@/inventory/items';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {
  private readonly getItemsService = inject(GetItemsQuery);

  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  getItems() {
    return this.getItemsService.watch().valueChanges;
  }
}
