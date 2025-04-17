import { User } from '@/interfaces/settings/users';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService extends Query<{
  login: {
    accessToken: string;
    user: User;
  };
}> {
  document = gql`
    query AuthUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        accessToken
        user {
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
    }
  `;
}
