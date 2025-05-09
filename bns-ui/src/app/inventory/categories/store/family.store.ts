import { FormHandler, YupFormControls } from '@/common/validators';
import {
  FamilySchema,
  FamilyValidator,
} from '@/inventory/categories/validators';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FamilyStore {
  familyValidator = inject(FamilyValidator);

  form!: FormGroup<YupFormControls<FamilySchema>>;
  constructor() {
    const formData: FamilySchema = this.familyValidator.initialData;
    this.form = FormHandler.formControls<FamilySchema>(formData);

    this.form.setValidators(
      FormHandler.validate<FamilySchema>(this.familyValidator.validator)
    );
  }

  onSubmit(callback: (isCodeValid: boolean) => void) {
    // Passthrough to call the validator to check if the category code exists already
    this.familyValidator.validateCode(this.form.value.code, callback);
  }
}
