import { Subcategory } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesQuery extends Query<{
  categorySubcategories: Subcategory[];
}> {
  override document = gql`
    query GetCategorySubcategories($categoryCode: String!) {
      categorySubcategories(categoryCode: $categoryCode) {
        code
        name
        canPromote
        canTransfer
      }
    }
  `;
}
