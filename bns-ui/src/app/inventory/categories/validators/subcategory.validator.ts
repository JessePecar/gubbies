import { inject, Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';
import { SubcategoryQuery } from '@/inventory/categories/requests';

export type SubcategorySchema =
  | {
      name: string;
      code: string;
      canPromote: boolean;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class SubcategoryValidator implements BaseValidator<SubcategorySchema> {
  subcategoryQuery = inject(SubcategoryQuery);
  validator = yup.object().shape({
    name: yup
      .string()
      .required('Subcategory name must be provided')
      .max(32, 'Subcategory name is too long')
      .min(1, 'Subcategory name is to short'),
    code: yup
      .string()
      .required('Subcategory code must be provided')
      .min(4, 'Subcategory code is too short')
      .max(8, 'Subcategory code is too long'),
    canPromote: yup.boolean(),
  });

  initialData: SubcategorySchema = {
    name: '',
    code: '',
    canPromote: false,
  };

  async validateCode(value: string, callback: (isCodeValid: boolean) => void) {
    return this.subcategoryQuery
      .fetch({
        code: value,
      })
      .subscribe(({ data: { subcategory }, errors }) => {
        if (subcategory === undefined || subcategory === null || errors) {
          callback(true);
        } else {
          callback(false);
        }
      });
  }
}
