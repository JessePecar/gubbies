import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as yup from 'yup';

type AnyObject = { [key: string]: any };

export type YupFormControls<TSchema> = {
  [P in keyof TSchema]: FormControl<TSchema[P]> | FormGroup;
};

export class FormHandler {
  // Generate the form controls based on the yup schema given
  static formControls<TSchema extends AnyObject>(
    formFields: TSchema
  ): FormGroup<YupFormControls<TSchema>> {
    const formControls: YupFormControls<TSchema> =
      {} as YupFormControls<TSchema>;
    for (const [key, value] of Object.entries(formFields)) {
      if (formFields[key] instanceof Object) {
        formControls[key as keyof TSchema] = this.formControls(formFields[key]);
      } else {
        formControls[key as keyof TSchema] = new FormControl(value);
      }
    }

    new FormGroup({
      temp: new FormGroup({}),
    });
    return new FormGroup(formControls);
  }

  // Validate the form when changed
  static validate<TSchema extends yup.AnyObject>(
    schema: yup.ObjectSchema<TSchema>
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormGroup)) return null;

      try {
        schema.validateSync(control.value, { abortEarly: false });
        return null;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errorObjects = error.inner;

          // Fill up the validation errors that were returned from yup
          let filteredErrors: yup.ValidationError[] = [];
          errorObjects.forEach((validationError: yup.ValidationError) => {
            const isExisting = filteredErrors.some(
              fe => validationError.path === fe.path
            );
            if (!isExisting) return filteredErrors.push(validationError);

            filteredErrors = filteredErrors.map(fe => {
              if (fe.path === validationError.path)
                fe.errors.push(validationError.message);

              return fe;
            });

            return;
          });

          // Translate yup errors to Form Control errors
          const errors: ValidationErrors = {};
          filteredErrors.forEach((filteredError: yup.ValidationError) => {
            if (!filteredError.path) return;

            const formControl = control.get(filteredError.path);

            if (!formControl) return;
            formControl.setErrors({ errors: filteredError.errors });
            errors[filteredError.path] = filteredError.errors;
          });

          return errors;
        }

        throw error; // Rethrow error if the error is outside of the yup validation
      }
    };
  }

  // Get the error messages for the form control
  static getControlsError<TSchema extends AnyObject>(
    form: FormGroup<YupFormControls<TSchema>>,
    controlName: keyof TSchema &
      string /* This will ensure controlName is a keyof TSchema, whilst also satisfying the need for it to be a string when getting the control*/
  ) {
    const control = form.get(controlName);
    if (control?.pristine && !control.touched) return;

    // Get the error based on the control name given
    return form?.errors?.[controlName];
  }
}
