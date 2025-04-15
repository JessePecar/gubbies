import { Address, Phone } from '@/interfaces/settings/users';
import { YupFormControls } from '@/common/validators';
import { VendorSchema, VendorValidator } from '@/inventory/vendors/validators';
import { FormHandler } from '@/common/validators';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateVendor } from '@/inventory/vendors/create/create-vendor.service';

export interface Vendor {
  id: number;
  name: string;
  notes: string;

  address: Address;
  primaryPhone: Phone;
  secondaryPhone: Phone;
}

@Injectable({
  providedIn: 'root',
})
export class VendorStoreService {
  private readonly vendorValidator = inject(VendorValidator);

  form: FormGroup<YupFormControls<VendorSchema>>;

  constructor() {
    // Create the blank data object for a new form
    const formData: VendorSchema = this.vendorValidator.initialData;

    this.form = FormHandler.formControls<VendorSchema>(formData);
    this.form.setValidators(
      FormHandler.validate<VendorSchema>(this.vendorValidator.validator)
    );
  }

  populateForm(vendor: VendorSchema) {
    this.form = FormHandler.formControls<VendorSchema>(vendor);
    // Not sure if this is necessary
    this.form.setValidators(
      FormHandler.validate<VendorSchema>(this.vendorValidator.validator)
    );
  }

  schemaToCreateObject(vendor: VendorSchema) {
    return {
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
  }
}
