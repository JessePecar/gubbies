import { inject, Injectable, signal } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';
import { CategoryQuery } from '@/inventory/categories/requests';

export type CategorySchema =
  | {
      name: string;
      code: string;
      canPromote: boolean;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class CategoryValidator implements BaseValidator<CategorySchema> {
  categoryQuery = inject(CategoryQuery);

  validator = yup.object().shape({
    name: yup
      .string()
      .required('Category name must be provided')
      .max(32, 'Category name is too long')
      .min(1, 'Category name is to short'),
    code: yup
      .string()
      .required('Category code must be provided')
      .min(4, 'Category code is too short')
      .max(8, 'Category code is too long'),
    canPromote: yup.boolean(),
  });

  initialData: CategorySchema = {
    name: '',
    code: '',
    canPromote: false,
  };

  async validateCode(value: string, callback: (isCodeValid: boolean) => void) {
    return this.categoryQuery
      .fetch({
        code: value,
      })
      .subscribe(({ data: { category }, errors }) => {
        if (category === undefined || category === null || errors) {
          callback(true);
        } else {
          callback(false);
        }
      });
  }
}
