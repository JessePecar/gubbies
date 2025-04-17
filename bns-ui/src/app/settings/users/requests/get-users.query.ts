import { User } from '@/interfaces/settings/users';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetUsersQuery extends Query<{ users: User[] }> {
  document = gql`
    query {
      users {
        id
        firstName
        lastName
        userName
        emailAddress
        isActive
        role {
          name
        }
        primaryPhone {
          rawDigits
          nationalDigits
        }
        address {
          address1
          address2
          city
          state
          countryCode
        }
      }
    }
  `;
}
