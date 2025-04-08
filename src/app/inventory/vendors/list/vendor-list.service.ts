import { inject, Injectable } from '@angular/core';
import { GetVendorsService } from '@/inventory/vendors/requests';

@Injectable({
  providedIn: 'root',
})
export class VendorListService {
  getVendorsService = inject(GetVendorsService);

  constructor() {
    this.getVendorsService
      .watch()
      .valueChanges.subscribe(({ data: { vendors } }) => {
        console.log(vendors);
      });
  }
}
