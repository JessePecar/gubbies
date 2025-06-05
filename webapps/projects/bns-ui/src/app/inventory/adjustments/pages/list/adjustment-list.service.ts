import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdjustmentsListService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  // Get the adjustments for the view adjustment list
  getAdjustments() {
    const requestUrl = `${this.baseUrl}/adjustments`;
    return this.httpClient.get<any | undefined>(requestUrl);
  }
}
