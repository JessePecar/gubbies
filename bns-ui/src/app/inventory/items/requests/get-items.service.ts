import { Item } from '@/interfaces';
import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetItemsService extends Query<{ items: Item[] }> {
  document = gql`
    query {
      items {
        id
        name
        quantityOnHand
        unitOfMeasurementType
        basePrice
        currentPrice
        category {
          name
        }
        subCategory {
          name
        }
        family {
          name
        }
      }
    }
  `;
}
