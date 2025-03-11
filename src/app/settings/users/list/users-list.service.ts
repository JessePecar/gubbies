import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '@interfaces/settings/users';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private readonly graphQLClient = inject(Apollo);

  getUsers() {
    return this.graphQLClient.watchQuery<{ users: User[] }>({
      query: gql`
        query {
          users {
            id
            firstName
            lastName
            userName
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
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
    }).valueChanges;
  }

  constructor() {}
}
