import { Role } from '@interfaces/settings/roles';
import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class RoleDetailsService {
  graphQLClient = inject(Apollo);
  constructor() {}

  getRole(id?: number) {
    if (id === undefined) {
      return undefined;
    }
    return this.graphQLClient.watchQuery<{ role: Role }>({
      query: gql`
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
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
      variables: {
        id,
      },
    }).valueChanges;
  }

  getTiers() {
    return this.graphQLClient.watchQuery<{
      roleTiers: { tierNumber: number }[];
    }>({
      query: gql`
        query {
          roleTiers {
            tierNumber
          }
        }
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
    }).valueChanges;
  }
}
