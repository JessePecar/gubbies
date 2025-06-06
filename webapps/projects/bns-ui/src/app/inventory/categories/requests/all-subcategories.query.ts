import { Subcategory } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AllSubcategoriesQuery extends Query<{
  subcategories: Subcategory[];
}> {
  override document = gql`
    query {
      subcategories {
        code
        name
        canPromote
        canTransfer
        category {
          name
        }
        families {
          code
        }
      }
    }
  `;
}
