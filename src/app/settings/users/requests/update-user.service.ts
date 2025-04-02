import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService extends Mutation {
  document = gql`
    mutation UpdateUser($updatedUser: UpdateUserInput) {
      updateUser(updateUserInput: $updatedUser) {
        id
        firstName
        lastName
        userName
        isActive
        emailAddress
        primaryPhone {
          rawDigits
          nationalDigits
        }
        role {
          name
          id
        }
        address {
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
