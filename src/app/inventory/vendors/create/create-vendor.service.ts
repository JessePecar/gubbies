import { Injectable } from '@angular/core';

export type VendorFormGroupNames = 'info' | 'address' | 'phone';

@Injectable({
  providedIn: 'root',
})
export class CreateVendorService {
  constructor() {}
}
