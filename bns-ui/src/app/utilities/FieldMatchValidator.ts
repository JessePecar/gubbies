import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FieldMetchValidator {
  static matchField =
    (compareField: string, matchingField: string): ValidatorFn =>
    (abstractControl: AbstractControl) => {
      const originalField = abstractControl.get(compareField)?.value;
      const validatingField = abstractControl.get(matchingField)?.value;

      if (originalField === validatingField) {
        return null;
      }

      return {
        fieldsMatchError: `${matchingField} must match ${compareField}`,
      } as ValidationErrors;
    };
}
