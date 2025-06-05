import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Vendor } from '@/inventory/vendors/store';

@Injectable({
  providedIn: 'root',
})
export class GetVendorsQuery extends Query<{ vendors: Vendor[] }> {
  document = gql`
    query {
      vendors {
        id
        name
        notes
        primaryPhone {
          nationalDigits
        }
        secondaryPhone {
          nationalDigits
        }
        address {
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
