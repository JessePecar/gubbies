import { inject, Injectable, signal } from '@angular/core';
import { GetVendorsService } from '@/inventory/vendors/requests';
import { Vendor } from '@/inventory/vendors/store';
import { GlobalAlertService } from '@/components/alert';
import { handleResponse } from '@/utilities/GraphQLResponseHandler';

@Injectable({
  providedIn: 'root',
})
export class VendorListService {
  alertService = inject(GlobalAlertService);
  getVendorsService = inject(GetVendorsService);

  vendors = signal<Vendor[]>([]);

  constructor() {
    this.getVendorsService
      .watch()
      .valueChanges.subscribe(({ data: { vendors }, error, errors }) => {
        return handleResponse(
          this.alertService,
          () => {
            this.vendors.set(vendors);
          },
          error,
          errors
        );
      });
  }
}
