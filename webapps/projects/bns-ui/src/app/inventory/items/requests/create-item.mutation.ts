import { Item } from '@/models/bns';
import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateItemMutation extends Mutation<{ itemId: number }> {
  document = gql`
    mutation CreateItem($createItem: CreateItemInput) {
      createItem(createItemInput: $createItem) {
        id
      }
    }
  `;
}
