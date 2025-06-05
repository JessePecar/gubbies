import { Family } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AllFamiliesQuery extends Query<{
  families: Family[];
}> {
  override document = gql`
    query {
      families {
        code
        name
        canPromote
        canTransfer
        canPriceChange
        subcategory {
          name
        }
        location {
          id
          aisle
          side
          section
        }
      }
    }
  `;
}
