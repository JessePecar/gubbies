import { Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';

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
}
