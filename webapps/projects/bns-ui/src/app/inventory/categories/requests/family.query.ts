import { Family, Subcategory } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class FamilyQuery extends Query<{ family: Family }> {
  override document = gql`
    query GetFamily($code: String!) {
      family(code: $code) {
        code
        name
        canPromote
        canTransfer
        canPriceChange
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
