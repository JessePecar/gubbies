import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateUserMutation extends Mutation {
  document = gql`
    mutation CreateUser($updatedUser: CreateUserInput) {
      createUser(createUserInput: $updatedUser) {
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
