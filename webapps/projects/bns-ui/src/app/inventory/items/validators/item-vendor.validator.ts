import { Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/core/validators';

export type ItemVendorSchema =
  | {
      vendorId: number;
      vendorItemId: string;
      cost?: number;
      canReturn: boolean;
      isAutoReplenish: boolean;
      isPreferredVendor: boolean;
      canPromote: boolean;
      reorderQuantity: number;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class ItemVendorValidator implements BaseValidator<ItemVendorSchema> {
  validator = yup.object().shape({
    vendorId: yup.number().required('Vendor must be provided'),
    vendorItemId: yup.string(),
    cost: yup
      .number()
      .positive('Cost must be above $0.00')
      .required('Cost must be provided for the vendor')
      .test(
        'decimal-check',
        'Cost must be a valid monetary amount',
        value => !!`${value}`.match(/^\d+(\.\d{0,2})?$/)
      ),
    canReturn: yup.boolean(),
    isAutoReplenish: yup.boolean(),
    isPreferredVendor: yup.boolean(),
    canPromote: yup.boolean(),
    reorderQuantity: yup
      .number()
      .optional()
      .positive('Reorder Quantity must be a positive number'),
  });

  initialData: ItemVendorSchema = {
    vendorId: 0,
    vendorItemId: '',
    cost: undefined,
    canPromote: false,
    isPreferredVendor: false,
    isAutoReplenish: true,
    canReturn: true,
    reorderQuantity: undefined,
  };
}
