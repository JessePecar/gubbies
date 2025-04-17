import { Permission } from '@/interfaces/settings/roles';
import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetPermissionsService extends Query<{
  permissions: Permission[];
}> {
  document = gql`
    query {
      permissions {
        id
        name
      }
    }
  `;
}
