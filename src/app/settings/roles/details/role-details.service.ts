import { Role, UpdateRole } from '@interfaces/settings/roles';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { GlobalAlertService } from '@/components/alert/global-alert.service';
import { Router } from '@angular/router';
import {
  UpsertRoleService,
  GetTiersService,
  GetPermissionsService,
  GetRoleService,
} from '@/settings/roles';

@Injectable({
  providedIn: 'root',
})
export class RoleDetailsService {
  alertService = inject(GlobalAlertService);
  router = inject(Router);

  private readonly upsertRoleService = inject(UpsertRoleService);
  private readonly getTiersService = inject(GetTiersService);
  private readonly getPermissionsService = inject(GetPermissionsService);
  private readonly getRoleService = inject(GetRoleService);

  getRole(id?: number) {
    if (id === undefined) {
      return new Observable<ApolloQueryResult<{ role: Role }>>();
    }

    return this.getRoleService.watch({
      id: +id, // Telling graphql that this will be an integer
    }).valueChanges;
  }

  getPermissions() {
    return this.getPermissionsService.watch().valueChanges;
  }

  getTiers() {
    return this.getTiersService.watch().valueChanges;
  }

  updateRole(role: UpdateRole) {
    return this.upsertRoleService
      .mutate({
        upsertRoleInput: role,
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
