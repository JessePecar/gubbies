import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '@/models/bns';

@Injectable({
  providedIn: 'root',
})
export class AdjustmentFormService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  // Get the adjustments for the view adjustment list
  getItems(): Observable<Item[] | undefined> {
    const requestUrl = `${this.baseUrl}/items`;
    return this.httpClient.get<any | undefined>(requestUrl);
  }

  // Create a new adjustment process
  createAdjustment() {}

  // Void an adjustment that was completed
  voidAdjustment(id: number) {}

  // Cancel an in progress adjustment
  cancelAdjustment(id: number) {}
}
