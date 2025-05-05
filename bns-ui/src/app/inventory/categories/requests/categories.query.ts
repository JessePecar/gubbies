import { Category } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CategoriesQuery extends Query<{ categories: Category[] }> {
  override document = gql`
    query {
      categories {
        code
        name
        canPromote
        canTransfer
        subcategories {
          code
        }
      }
    }
  `;
}
