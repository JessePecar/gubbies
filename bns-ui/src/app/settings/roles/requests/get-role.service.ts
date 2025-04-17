import { Role } from '@/interfaces/settings/roles';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetRoleService extends Query<{ role: Role }> {
  document = gql`
    query GetRole($id: Int!) {
      role(id: $id) {
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
