import { FormHandler, YupFormControls } from '@/core/validators';
import {
  SubcategorySchema,
  SubcategoryValidator,
} from '@/inventory/categories/validators';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryStore {
  subcategoryValidator = inject(SubcategoryValidator);

  form!: FormGroup<YupFormControls<SubcategorySchema>>;
  constructor() {
    const formData: SubcategorySchema = this.subcategoryValidator.initialData;
    this.form = FormHandler.formControls<SubcategorySchema>(formData);

    this.form.setValidators(
      FormHandler.validate<SubcategorySchema>(
        this.subcategoryValidator.validator
      )
    );
  }

  onSubmit(callback: (isCodeValid: boolean) => void) {
    // Passthrough to call the validator to check if the category code exists already
    this.subcategoryValidator.validateCode(this.form.value.code, callback);
  }
}
