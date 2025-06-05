import { Category } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryMutation extends Mutation<{
  upsertCategory: Category;
}> {
  override document = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryInput) {
      upsertCategory(createCategoryInput: $createCategoryInput) {
        code
        name
        canPromote
        canTransfer
      }
    }
  `;
}
