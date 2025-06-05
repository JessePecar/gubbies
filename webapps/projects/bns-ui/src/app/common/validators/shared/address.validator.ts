import { Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/bns-ui/common/validators';
import { Address } from '@/models/core';

export type AddressSchema =
  | {
      address1: string;
      address2: string;
      city: string;
      state: string;
      countryCode: string;
      postalCode: string;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class AddressValidator implements BaseValidator<AddressSchema> {
  validator = yup.object().shape({
    address1: yup
      .string()
      .required('Street Address must be provided')
      .min(2, 'Street Address is too short')
      .max(64, 'Street Address is too long'),
    address2: yup
      .string()
      .optional()
      .nullable()
      .min(0, 'Second Address Line is too short')
      .max(64, 'Second Address Line is too long'),
    city: yup
      .string()
      .required('City must be provided')
      .min(2, 'City is too short')
      .max(64, 'City is too long'),
    // State will be provided by a dropdown/search box
    state: yup
      .string()
      .required('State must be provided')
      .min(4, 'State is too short')
      .max(14, 'State is too long'),
    // Country code will be provided by a dropdown of available countries for Gubbies
    countryCode: yup
      .string()
      .required('Country must be provided')
      .min(2, 'Country is too short')
      .max(2, 'Country is too long'),
    postalCode: yup
      .string()
      .required('Postal Code must be provided')
      .min(5, 'Postal Code is too short')
      .max(5, 'Postal Code is too long'),
  });

  initialData: AddressSchema = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    countryCode: '',
    postalCode: '',
  };

  convertToSchema(address: Address) {
    return {
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      countryCode: address.countryCode,
      postalCode: address.postalCode,
      state: address.state,
    } as AddressSchema;
  }
}
