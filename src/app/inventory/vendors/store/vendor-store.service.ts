import { VendorSchema, VendorValidator, YupFormControls } from '@/validators';
import { FormHandler } from '@/validators';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class VendorStoreService {
  private readonly vendorValidator = inject(VendorValidator);

  formBuilder = inject(FormBuilder);

  form: FormGroup<YupFormControls<VendorSchema>>;

  constructor() {
    // Create the blank data object for a new form
    const formData: VendorSchema = this.vendorValidator.initialData;

    this.form = FormHandler.formControls<VendorSchema>(formData);
    this.form.setValidators(
      FormHandler.validate<VendorSchema>(this.vendorValidator.validator)
    );
  }

  populateForm(
    vendor: any /* Given a fully populated vendor, we will replace the form data in the Form Group */
  ) {
    this.form = FormHandler.formControls<VendorSchema>(vendor as VendorSchema);
    // Not sure if this is necessary
    this.form.setValidators(
      FormHandler.validate<VendorSchema>(this.vendorValidator.validator)
    );
  }
}
