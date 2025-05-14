import {
  BaseValidator,
  FormHandler,
  YupFormControls,
} from '@/common/validators';
import { FormGroup } from '@angular/forms';
import * as yup from 'yup';

export abstract class BaseStore<
  TSchema extends yup.AnyObject,
  TValidator extends BaseValidator<TSchema>,
  TDataObject extends Object,
> {
  form!: FormGroup<YupFormControls<TSchema>>;

  constructor(private validator: TValidator) {
    const formData: TSchema = validator.initialData;
    this.form = FormHandler.formControls<TSchema>(formData);

    this.form.setValidators(FormHandler.validate<TSchema>(validator.validator));
  }

  protected populateForm(formData: TSchema) {
    this.form = FormHandler.formControls<TSchema>(formData);
    // Not sure if this is necessary
    this.form.setValidators(
      FormHandler.validate<TSchema>(this.validator.validator)
    );
  }
  abstract schemaToCreateObject(formData: TSchema): TDataObject;
}
