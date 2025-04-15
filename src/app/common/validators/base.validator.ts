import * as yup from 'yup';

export abstract class BaseValidator<TSchema extends yup.AnyObject> {
  // Required property when creating a validator for creating the yup validation
  abstract validator: yup.ObjectSchema<TSchema>;
  // Required property when creating a validator for the base data set to be used in the validation schema
  abstract initialData: TSchema;
}
