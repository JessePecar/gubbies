import { PermissionGroup } from '@/interfaces/settings/roles';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetPermissionGroupsService extends Query<{
  permissionGroups: PermissionGroup[];
}> {
  document = gql`
    query {
      permissionGroups {
        id
        name
        permissions {
          id
          name
        }
      }
    }
  `;
}
