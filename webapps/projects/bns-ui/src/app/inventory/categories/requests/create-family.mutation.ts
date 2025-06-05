import { Family } from '@/inventory/categories/interfaces';
import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateFamilyMutation extends Mutation<{
  upsertFamily: Family;
}> {
  override document = gql`
    mutation CreateSubcategory($createFamilyInput: CreateFamilyInput) {
      upsertFamily(createFamilyInput: $createFamilyInput) {
        code
        name
        canPromote
        canTransfer
        canPriceChange
        location {
          aisle
          side
          section
          id
        }
      }
    }
  `;
}
