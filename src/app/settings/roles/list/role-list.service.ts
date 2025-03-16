import { Role } from '@/interfaces/settings/roles';
import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class RoleListService {
  private readonly graphQLClient = inject(Apollo);
  constructor() {}

  getRoles() {
    this.graphQLClient.query<Role>({
      query: gql`
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
      `,
    });
  }
}
