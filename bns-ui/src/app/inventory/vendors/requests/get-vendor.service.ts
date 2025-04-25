import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Vendor } from '@/inventory/vendors/store';

@Injectable({
  providedIn: 'root',
})
export class GetVendorService extends Query<{ vendor: Vendor }> {
  document = gql`
    query GetVendor($id: Int!) {
      vendor(id: $id) {
        id
        name
        notes
        primaryPhone {
          id
          rawDigits
          nationalDigits
        }
        secondaryPhone {
          id
          rawDigits
          nationalDigits
        }
        address {
          id
          address1
          address2
          city
          state
          countryCode
        }
      }
    }
  `;
}
