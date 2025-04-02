import { Role } from '@/interfaces/settings/roles';
import { Injectable } from '@angular/core';
import { Subscription, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class RoleSubscriptionService extends Subscription<{
  roleUpdated: Role;
}> {
  override document = gql`
    subscription roleUpdated {
      roleUpdated {
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
    }
  `;
}
