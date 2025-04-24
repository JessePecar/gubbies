import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CategoriesQuery extends Query {
  override document = gql`
    query {
      categories {
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
