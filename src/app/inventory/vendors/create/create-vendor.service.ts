import { VendorSchema } from '@/validators';
import { inject, Injectable } from '@angular/core';
import { CreateVendorService as CreateVendorMutation } from '@/inventory/vendors/requests';

export type VendorFormGroupNames = 'info' | 'address' | 'phone';

@Injectable({
  providedIn: 'root',
})
export class CreateVendorService {
  private readonly createVendorService = inject(CreateVendorMutation);

  onCreate(vendor: VendorSchema) {
    // Translate vendor schema to the vendor object
    const newVendor = vendor;
    // Submit to the API in a mutation
    this.createVendorService
      .mutate({
        newVendor,
      })
      .subscribe(result => {
        if (result.errors) {
          // TODO: Show error
        } else {
          //TODO: Show Success and then navigate
        }
      });
  }
}
