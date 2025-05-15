import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateVendorMutation extends Mutation<{ createVendor: any }> {
  document = gql`
    mutation CreateVendor($createVendor: CreateVendorInput) {
      createVendor(createVendorInput: $createVendor) {
        id
      }
    }
  `;
}
