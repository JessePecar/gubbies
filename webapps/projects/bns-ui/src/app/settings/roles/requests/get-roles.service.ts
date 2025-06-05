import { Role } from '@/models/auth/role';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetRolesService extends Query<{ roles: Role[] }> {
  document = gql`
    query {
      roles {
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
