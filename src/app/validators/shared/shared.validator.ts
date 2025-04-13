import * as yup from 'yup';

export const passwordValidator = yup.string().required().min(8).max(16);
