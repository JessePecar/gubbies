import { Permission } from '@/models/auth/role';
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
