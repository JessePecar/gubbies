import { Subcategory } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryQuery extends Query<{ subcategory: Subcategory }> {
  override document = gql`
    query GetSubcategory($code: String!) {
      subcategory(code: $code) {
        code
        name
        canPromote
        families {
          code
          name
          canPromote
          location {
            id
            aisle
            side
            section
          }
        }
      }
    }
  `;
}
