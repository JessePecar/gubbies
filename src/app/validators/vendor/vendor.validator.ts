import { inject, Injectable } from '@angular/core';
import {
  AddressSchema,
  AddressValidator,
  PhoneSchema,
  PhoneValidator,
} from '@/validators/shared';
import * as yup from 'yup';
import { BaseValidator } from '@/validators';

export type VendorSchema =
  | {
      info: {
        name: string;
        notes: string;
      };
      address: AddressSchema;
      primaryPhone: PhoneSchema;
      secondaryPhone: PhoneSchema;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class VendorValidator implements BaseValidator<VendorSchema> {
  private readonly addressValidator = inject(AddressValidator);
  private readonly phoneValidator = inject(PhoneValidator);

  validator = yup.object().shape({
    info: yup.object().shape({
      name: yup
        .string()
        .required('Vendor name must be provided')
        .max(32, 'Vendor name is too long')
        .min(4, 'Vendor name is to short'),
      note: yup
        .string()
        .optional()
        .min(0, 'Vendor note is too short')
        .max(264, 'Vendor note is too long'),
    }),
    address: this.addressValidator.validator,
    primaryPhone: this.phoneValidator.validator,
    secondaryPhone: this.phoneValidator.validator,
  });

  initialData: VendorSchema = {
    info: {
      name: '',
      notes: '',
    },
    address: this.addressValidator.initialData,
    primaryPhone: this.phoneValidator.initialData,
    secondaryPhone: this.phoneValidator.initialData,
  };
}
