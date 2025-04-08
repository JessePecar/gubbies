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
      .matches(/^\d{7,14}$/, 'Must be a valid phone number'),
  });

  initialData: PhoneSchema = {
    rawDigits: '',
  };
}
