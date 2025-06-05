import { VendorSchema } from '@/inventory/vendors/validators';
import { inject, Injectable } from '@angular/core';
import { CreateVendorMutation } from '@/inventory/vendors/requests';
import { GlobalAlertService } from '@/core/components/alert';
import { Router } from '@angular/router';
import { VendorStoreService } from '../store';
import { Address, Phone } from '@/models/core';

export type VendorFormGroupNames = 'info' | 'address' | 'phone';

export type CreateVendor = {
  name: string;
  note: string;

  address: Address;
  primaryPhone: Phone;
  secondaryPhone: Phone;
};

@Injectable({
  providedIn: 'root',
})
export class CreateVendorService {
  private readonly createVendorMutation = inject(CreateVendorMutation);
  private readonly vendorStore = inject(VendorStoreService);
  private readonly alertService = inject(GlobalAlertService);
  private readonly router = inject(Router);

  onCreate(vendor: VendorSchema) {
    // Translate vendor schema to the vendor object
    const newVendor = this.vendorStore.schemaToCreateObject(vendor);

    // Submit to the API in a mutation
    this.createVendorMutation
      .mutate({
        createVendor: newVendor,
      })
      .subscribe(result => {
        if (result.errors && result.errors.length > 0) {
          // Show Errors
          this.alertService.addAlert(
            'error',
            'Error creating a new vendor',
            2000
          );
        } else {
          this.alertService.addAlert(
            'success',
            'Successfully created a new vendor',
            2000
          );
          this.router.navigate(['inventory/vendors/list']);
        }
      });
  }
}
