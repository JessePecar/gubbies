import { Address, Phone } from '@/interfaces/settings/users';
import { VendorSchema, VendorValidator, YupFormControls } from '@/validators';
import { FormHandler } from '@/validators';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateVendor } from '@/inventory/vendors/create/create-vendor.service';

export type Vendor = {
  id: number;
  name: string;
  notes: string;

  address: Address;
  primaryPhone: Phone;
  secondaryPhone: Phone;
};

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
