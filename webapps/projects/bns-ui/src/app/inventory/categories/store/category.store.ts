import { FormHandler, YupFormControls } from '@/core/validators';
import {
  CategorySchema,
  CategoryValidator,
} from '@/inventory/categories/validators';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryStore {
  categoryValidator = inject(CategoryValidator);

  form!: FormGroup<YupFormControls<CategorySchema>>;
  constructor() {
    const formData: CategorySchema = this.categoryValidator.initialData;
    this.form = FormHandler.formControls<CategorySchema>(formData);

    this.form.setValidators(
      FormHandler.validate<CategorySchema>(this.categoryValidator.validator)
    );
  }

  onSubmit(callback: (isCodeValid: boolean) => void) {
    // Passthrough to call the validator to check if the category code exists already
    this.categoryValidator.validateCode(this.form.value.code, callback);
  }
}
