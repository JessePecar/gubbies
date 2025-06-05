import { User } from '@/models/auth/user';
import { Injectable } from '@angular/core';
import { Subscription, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserSubscription extends Subscription<{
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
          hierarchyTier
          rolePermissions {
            permissionId
            permission {
              id
            }
          }
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
