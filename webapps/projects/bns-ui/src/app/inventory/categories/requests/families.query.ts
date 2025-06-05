import { Family } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class FamiliesQuery extends Query<{
  subcategoryFamilies: Family[];
}> {
  override document = gql`
    query GetSubcategoryFamilies($subcategoryCode: String!) {
      subcategoryFamilies(subcategoryCode: $subcategoryCode) {
        code
        name
        canPromote
        canTransfer
        canPriceChange
      }
    }
  `;
}
