import { User } from '@/interfaces/settings/users';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService extends Query<{ auth: User }> {
  document = gql`
    query AuthToken($token: String!) {
      auth(token: $token) {
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
  `;
}
