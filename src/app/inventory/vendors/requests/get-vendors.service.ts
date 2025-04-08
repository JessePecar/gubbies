import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetVendorsService extends Query<{ vendors: any[] }> {
  document = gql`
    query {
      vendors {
        id
        name
        notes
        primaryPhone {
          rawDigits
          nationalDigits
        }
        secondaryPhone {
          rawDigits
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
