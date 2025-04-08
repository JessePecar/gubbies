import { VendorSchema } from '@/validators';
import { inject, Injectable } from '@angular/core';
import { CreateVendorService as CreateVendorMutation } from '@/inventory/vendors/requests';
import { Phone, Address } from '@/interfaces/settings/users';
import { GlobalAlertService } from '@/components/alert';
import { Router } from '@angular/router';

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
  private readonly createVendorService = inject(CreateVendorMutation);
  private readonly alertService = inject(GlobalAlertService);
  private readonly router = inject(Router);

  onCreate(vendor: VendorSchema) {
    // Translate vendor schema to the vendor object
    const newVendor = {
      ...vendor.info,
      address: {
        ...vendor.address,
        postalCode: +vendor.address.postalCode,
      },
      primaryPhone: {
        ...vendor.primaryPhone,
        nationalDigits: `+1${vendor.primaryPhone.rawDigits}`,
      } as Phone,
      secondaryPhone: {
        ...vendor.secondaryPhone,
        nationalDigits: `+1${vendor.primaryPhone.rawDigits}`,
      },
    } as CreateVendor;

    // Submit to the API in a mutation
    this.createVendorService
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
