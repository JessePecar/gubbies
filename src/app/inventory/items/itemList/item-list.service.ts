import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/items';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  // Get the adjustments for the view adjustment list
  getItems(): Observable<Item[] | undefined> {
    const requestUrl = `${this.baseUrl}/items`;
    return this.httpClient.get<any | undefined>(requestUrl);
  }
}
