import { User } from '@/interfaces/settings/users';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetUserQuery extends Query<{ user: User }> {
  document = gql`
    query GetUsersById($id: ID!) {
      user(id: $id) {
        id
        firstName
        lastName
        userName
        isActive
        emailAddress
        roleId
        primaryPhone {
          id
          rawDigits
          nationalDigits
        }
        role {
          name
          id
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
