import { User } from '@/interfaces/settings/users';
import { Injectable } from '@angular/core';
import { Subscription, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserSubscriptionService extends Subscription<{
  usersChanged: User;
}> {
  override document = gql`
    subscription usersChanged {
      usersChanged {
        id
        firstName
        lastName
        userName
        emailAddress
        isActive
        role {
          id
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
