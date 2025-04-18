import * as yup from 'yup';

export const passwordValidator = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(16, 'Password must be no more than 16 characters');
