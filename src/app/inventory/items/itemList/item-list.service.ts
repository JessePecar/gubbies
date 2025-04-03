import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/items';
import { HttpClient } from '@angular/common/http';
import { GetItemsService } from '@/inventory/items';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {

  private readonly getItemsService = inject(GetItemsService);

  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  getItems() {
    return this.getItemsService.watch().valueChanges;
  }
}
