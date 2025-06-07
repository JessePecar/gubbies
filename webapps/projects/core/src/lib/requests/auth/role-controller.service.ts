import { ApiSettingsService } from '@/core/requests/api-settings.service';
import { BaseController } from '@/core/requests/base-controller.service';
import { Role } from '@/models/auth/role';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleControllerService extends BaseController {
  readonly apiSetting = inject(ApiSettingsService);
  readonly httpClient = inject(HttpClient);

  public getRole(roleId: string): Observable<Role> {
    return this.httpClient.get<Role>(
      `${this.apiSetting.authApi()}/${roleId}`,
      super.defaultHeader()
    );
  }
}
