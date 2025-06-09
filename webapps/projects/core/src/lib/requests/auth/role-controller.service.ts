import { ApiSettingsService } from '@/core/requests/api-settings.service';
import { BaseController } from '@/core/requests/base-controller.service';
import {
  Permission,
  PermissionGroup,
  Role,
  RoleTier,
} from '@/models/auth/role';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class RoleControllerService extends BaseController {
  readonly apiSetting = inject(ApiSettingsService);
  readonly httpClient = inject(HttpClient);

  public getRole(roleId: string): Observable<Role> {
    return this.httpClient.get<Role>(
      `${this.apiSetting.authApi()}/role/${roleId}`,
      super.defaultHeader()
    );
  }

  public getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(
      `${this.apiSetting.authApi()}/role`,
      super.defaultHeader()
    );
  }

  public getTiers(): Observable<RoleTier[]> {
    return this.httpClient.get<RoleTier[]>(
      `${this.apiSetting.authApi()}/role/tiers`,
      super.defaultHeader()
    );
  }

  public getPermissions(): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(
      `${this.apiSetting.authApi()}/role/permissions`,
      super.defaultHeader()
    );
  }

  public getPermissionGroups(): Observable<PermissionGroup[]> {
    return this.httpClient.get<PermissionGroup[]>(
      `${this.apiSetting.authApi()}/role/permissionGroups`,
      super.defaultHeader()
    );
  }

  public createRole(role: Role): Observable<Role> {
    return this.httpClient.post<Role>(
      `${this.apiSetting.authApi()}/role`,
      role,
      super.defaultHeader()
    );
  }

  public updateRole(role: Role): Observable<Role> {
    return this.httpClient.put<Role>(
      `${this.apiSetting.authApi()}/role`,
      role,
      super.defaultHeader()
    );
  }
}
