import { User } from '@interfaces/settings/users';
import { inject, Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  graphQLClient = inject(Apollo);

  constructor() {}

  authUser(username: string, password: string) {
    return this.graphQLClient.query<{ auth: User }>({
      query: gql`
        query AuthUser($username: String!, $password: String!) {
          auth(username: $username, password: $password) {
            id
            firstName
            lastName
            userName
            isActive
            emailAddress
            primaryPhone {
              id
              rawDigits
              nationalDigits
            }
            role {
              name
              id
              hierarchyTier
              rolePermissions {
                permissionId
              }
            }
            address {
              id
              address1
              address2
              city
              state
              countryCode
              postalCode
            }
          }
        }
      `,
      variables: {
        username,
        password,
      },
    });
  }
}
