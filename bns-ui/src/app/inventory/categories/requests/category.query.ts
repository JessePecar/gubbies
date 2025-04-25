import { Category } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CategoryQuery extends Query<{ category: Category }> {
  override document = gql`
    query GetCategory($code: String!) {
      category(code: $code) {
        code
        name
        canPromote
        subcategories {
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
    }
  `;
}
