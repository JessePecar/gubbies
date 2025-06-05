import { inject, Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/core/validators';
import {
  ShelfLocationSchema,
  ShelfLocationValidator,
} from '@/inventory/categories/validators/shelf-location.validator';
import { FamilyQuery } from '@/inventory/categories/requests';

export type FamilySchema =
  | {
      name: string;
      code: string;
      canPromote: boolean;
      canTransfer: boolean;
      canPriceChange: boolean;
      subcategoryCode: string;
      location: ShelfLocationSchema;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class FamilyValidator implements BaseValidator<FamilySchema> {
  shelfLocationValidator = inject(ShelfLocationValidator);
  familyQuery = inject(FamilyQuery);

  validator = yup.object().shape({
    name: yup
      .string()
      .required('Family name must be provided')
      .max(32, 'Family name is too long')
      .min(1, 'Family name is to short'),
    code: yup
      .string()
      .required('Family code must be provided')
      .min(4, 'Family code is too short')
      .max(8, 'Family code is too long'),
    subcategoryCode: yup.string().required(),
    canPromote: yup.boolean(),
    canPriceChange: yup.boolean(),
    canTransfer: yup.boolean(),
    location: this.shelfLocationValidator.validator,
  });

  initialData: FamilySchema = {
    name: '',
    code: '',
    canPromote: false,
    canPriceChange: false,
    canTransfer: false,
    subcategoryCode: '',
    location: this.shelfLocationValidator.initialData,
  };

  async validateCode(value: string, callback: (isCodeValid: boolean) => void) {
    return this.familyQuery
      .fetch({
        code: value,
      })
      .subscribe(({ data: { family }, errors }) => {
        if (family === undefined || family === null || errors) {
          callback(true);
        } else {
          callback(false);
        }
      });
  }
}
