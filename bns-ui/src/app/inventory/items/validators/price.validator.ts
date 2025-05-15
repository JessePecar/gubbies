import { Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/common/validators';

export type PriceSchema =
  | {
      price?: number;
      createOverridePrice?: boolean;
      expirationType?: number;
      expirationValue?: string | number;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class PriceValidator implements BaseValidator<PriceSchema> {
  validator = yup.object().shape({
    price: yup
      .number()
      .required('The price is required')
      .min(0.01, 'The item price must be at least 1 cent') //TODO: Determine if we want to allow 0 priced items
      .test(
        'decimal-check',
        'Price must be a valid monetary amount',
        value => !!`${value}`.match(/^\d+(\.\d{0,2})?$/)
      ),
    createOverridePrice: yup.boolean(),
    expirationType: yup
      .number()
      .when('createOverridePrice', createOverridePrice => {
        if (createOverridePrice) {
          return yup
            .number()
            .required(
              'Expiration type is required when setting the price to be overriden'
            );
        }

        return yup.number();
      }),

    expirationValue: yup.string().when('expirationType', expirationType => {
      // TODO: Determine what the value needs to be checked
      if (expirationType[0] === 1) {
        return yup
          .string()
          .datetime()
          .required(
            'Expiration date is required when setting the price to be expire by date'
          );
      }

      if (expirationType[0] === 2) {
        return yup
          .number()
          .min(0, 'The minimum quantity for expiration quantity should be 0')
          .required(
            'Expiration quantity is required when setting the price to be expire by quantity'
          );
      }

      return yup.string();
    }),
  });

  initialData: PriceSchema = {
    price: undefined,
    createOverridePrice: false,
    expirationType: undefined,
    expirationValue: undefined,
  };
}
