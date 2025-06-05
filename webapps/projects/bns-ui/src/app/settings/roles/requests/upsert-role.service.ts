import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UpsertRoleService extends Mutation {
  document = gql`
    mutation UpsertRole($upsertRoleInput: UpsertRoleInput) {
      upsertRole(upsertRoleInput: $upsertRoleInput) {
        id
        name
        hierarchyTier
        rolePermissions {
          permission {
            id
            name
          }
        }
      }
    }
  `;
}
