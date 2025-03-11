import { User } from '@/interfaces/settings/users';
import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private readonly graphQLClient = inject(Apollo);

  getUser(id: number) {
    return this.graphQLClient.query<{ user: User }>({
      query: gql`
        query GetUsersById($id: ID!) {
          user(id: $id) {
            id
            firstName
            lastName
            userName
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
            }
          }
        }
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
      variables: {
        id: id,
      },
    });
  }

  constructor() {}
}
