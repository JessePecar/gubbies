import { Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';
import { ShelfSide } from '@/inventory/categories/interfaces';

export type ShelfLocationSchema =
  | {
      aisle?: number;
      side: ShelfSide;
      section: string;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class ShelfLocationValidator
  implements BaseValidator<ShelfLocationSchema>
{
  validator = yup.object().shape({
    aisle: yup
      .number()
      .required('Aisle must be provided')
      .max(30, 'Aisle must be between 1 and 30')
      .min(1, 'Aisle must be between 1 and 30'),
    side: yup.string().required(), // This should ensure that it is either right or left
    section: yup
      .string()
      .required('Section must be provided')
      .min(2, 'Section is too short')
      .max(8, 'Section is too long'),
  });

  initialData: ShelfLocationSchema = {
    aisle: undefined,
    section: ShelfSide.RIGHT,
    side: '',
  };
}
