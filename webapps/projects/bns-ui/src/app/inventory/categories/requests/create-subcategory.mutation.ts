import { Subcategory } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateSubcategoryMutation extends Mutation<{
  upsertSubcategory: Subcategory;
}> {
  override document = gql`
    mutation CreateSubcategory(
      $createSubcategoryInput: CreateSubcategoryInput
    ) {
      upsertSubcategory(createSubcategoryInput: $createSubcategoryInput) {
        code
        name
        canPromote
        canTransfer
      }
    }
  `;
}
