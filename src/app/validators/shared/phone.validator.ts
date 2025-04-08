import { Injectable } from '@angular/core';
import * as yup from 'yup';
import { BaseValidator } from '@/validators';

export type PhoneSchema =
  | {
      rawDigits: string;
    }
  | yup.AnyObject;

@Injectable({
  providedIn: 'root',
})
export class PhoneValidator implements BaseValidator<PhoneSchema> {
  validator = yup.object().shape({
    rawDigits: yup
      .string()
      .required()
      .matches(new RegExp('\d{10}'), 'Must be a valid phone number'),
  });

  initialData: PhoneSchema = {
    rawDigits: '',
  };
}

//^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$
