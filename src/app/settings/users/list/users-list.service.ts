import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '@interfaces/settings/users';
import { UserSubscriptionService } from './user-subscription.service';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private readonly graphQLClient = inject(Apollo);
  private readonly userSubscriptionService = inject(UserSubscriptionService);

  getUsersQuery() {
    return this.graphQLClient.watchQuery<{ users: User[] }>({
      query: gql`
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
      `,
    });
  }

  getUsers() {
    return this.getUsersQuery().valueChanges;
  }

  subscribeToChanges() {
    console.log('Subscribing to changes');
    return this.userSubscriptionService.subscribe();
  }

  subscribeToMore() {
    return this.getUsersQuery().subscribeToMore({
      document: this.userSubscriptionService.document,
      updateQuery: () => {
        console.log('Update received');
      },
    });
  }

  constructor() {}
}
