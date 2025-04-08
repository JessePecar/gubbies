import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as yup from 'yup';

@Injectable({
  providedIn: 'root',
})
export class VendorStoreService {
  formBuilder = inject(FormBuilder);

  // TODO: Add the validation messages for the error
  vendorValidator = yup.object().shape({
    name: yup.string().required().max(32).min(4),
    note: yup.string().min(0),
    address: yup.object(),
    primaryPhone: yup.object(),
    secondaryPhone: yup.object(),
  });

  // Create Form - Using the yup form validation
  createForm() {
    // Create the default values of the form
  }
}
