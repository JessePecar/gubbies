import { inject, Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';
import {
  RetirementStatus,
  UnitOfMeasurementType,
} from '@/inventory/items/interfaces';
import { PriceSchema, PriceValidator } from './price.validator';
import { ItemVendorSchema, ItemVendorValidator } from './item-vendor.validator';
import {
  ShelfLocationSchema,
  ShelfLocationValidator,
} from '@/inventory/categories/validators';

export type ItemInfoSchema =
  | {
      name: string;
      quantityOnHand: string;
      isActive: boolean;

      // Dropdown values
      retirementStatus: number; // Enum
      unitOfMeasurementType: number; // Enum
      categoryCode?: string;
      subcategoryCode?: string;
      familyCode?: string;
    }
  | yup.AnyObject;

export type ItemSchema =
  | {
      // object Validators
      info: ItemInfoSchema;
      price: PriceSchema;
      location: ShelfLocationSchema;
      vendors: ItemVendorSchema[];
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class ItemValidator implements BaseValidator<ItemSchema> {
  priceValidator = inject(PriceValidator);
  locationValidator = inject(ShelfLocationValidator);
  itemVendorValidator = inject(ItemVendorValidator);

  validator = yup.object().shape({
    info: yup.object().shape({
      name: yup
        .string()
        .required('Item name is required')
        .max(64, 'Item name must be between 1 and 64 characters')
        .min(1, 'Item name must be between 1 and 64 characters'),
      quantityOnHand: yup
        .number()
        .required()
        .min(0, 'Quantity on hand must be above 0'),
      isActive: yup.boolean(),
      retirementStatus: yup.number().default(0),
      unitOfMeasurementType: yup
        .number()
        .required('Unit of measurement must be set')
        .default(0),
      categoryCode: yup.string(),
      subcategoryCode: yup.string(),
      familyCode: yup.string(),
    }),
    vendors: yup.array(this.itemVendorValidator.validator),
    price: this.priceValidator.validator,
    location: this.locationValidator.validator,
  });

  initialData: ItemSchema = {
    info: {
      name: '',
      quantityOnHand: undefined,
      isActive: true,
      retirementStatus: RetirementStatus.ACTIVE, // Active
      unitOfMeasurementType: UnitOfMeasurementType.EA,
      categoryCode: undefined,
      subcategoryCode: undefined,
      familyCode: undefined,
    },
    price: this.priceValidator.initialData,
    location: this.locationValidator.initialData,
    vendors: [this.itemVendorValidator.initialData],
  };
}
