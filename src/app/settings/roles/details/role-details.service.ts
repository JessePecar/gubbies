import { Permission, Role, UpdateRole } from '@interfaces/settings/roles';
import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { GlobalAlertService } from '@/components/alert/global-alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleDetailsService {
  graphQLClient = inject(Apollo);
  alertService = inject(GlobalAlertService);
  router = inject(Router);

  constructor() {}

  getRole(id?: number) {
    if (id === undefined) {
      return new Observable<ApolloQueryResult<{ role: Role }>>();
    }

    return this.graphQLClient.watchQuery<{ role: Role }>({
      query: gql`
        query GetRole($id: Int!) {
          role(id: $id) {
            id
            name
            hierarchyTier
            rolePermissions {
              permission {
                id
                name
              }
            }
          }
        }
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
      variables: {
        id: +id, // Telling graphql that this will be an integer
      },
    }).valueChanges;
  }

  getPermissions() {
    return this.graphQLClient.watchQuery<{
      permissions: Permission[];
    }>({
      query: gql`
        query {
          permissions {
            id
            name
          }
        }
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
    }).valueChanges;
  }

  getTiers() {
    return this.graphQLClient.watchQuery<{
      roleTiers: { tierNumber: number }[];
    }>({
      query: gql`
        query {
          roleTiers {
            tierNumber
          }
        }
      `,
      context: {
        uri: 'http://localhost:3000/graphql',
      },
    }).valueChanges;
  }

  updateRole(role: UpdateRole) {
    return this.graphQLClient
      .mutate({
        mutation: gql`
          mutation UpsertRole($upsertRoleInput: UpsertRoleInput) {
            upsertRole(upsertRoleInput: $upsertRoleInput) {
              id
              name
              hierarchyTier
              rolePermissions {
                permission {
                  id
                  name
                }
              }
            }
          }
        `,
        context: {
          uri: 'http://localhost:3000/graphql',
        },
        variables: {
          upsertRoleInput: role,
        },
      })
      .subscribe(res => {
        if (res.errors && res.errors.length > 0) {
          // Show Errors
          this.alertService.addAlert(
            'error',
            'Error adding or updating user',
            2000
          );
        } else {
          this.alertService.addAlert(
            'success',
            'Successfully added or updated user',
            2000
          );
          this.router.navigate(['settings', 'roles', 'list']);
        }
      });
  }
}
