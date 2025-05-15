import { inject, Injectable, signal } from '@angular/core';
import { GetVendorsQuery } from '@/inventory/vendors/requests';
import { Vendor } from '@/inventory/vendors/store';
import { GlobalAlertService } from '@/components/alert';
import { handleResponse } from '@/utilities/GraphQLResponseHandler';

@Injectable({
  providedIn: 'root',
})
export class VendorListService {
  alertService = inject(GlobalAlertService);
  getVendorsQuery = inject(GetVendorsQuery);

  vendors = signal<Vendor[]>([]);

  constructor() {
    this.getVendorsQuery
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
