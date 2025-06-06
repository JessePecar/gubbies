import { BaseController } from '@/core/requests/base-controller.service';
import { Role } from '@/models/auth/role';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleControllerService extends BaseController {
  readonly api = 'http://localhost:3002/role';
  readonly httpClient = inject(HttpClient);

  public getRole(roleId: string): Observable<Role> {
    return this.httpClient.get<Role>(
      `${this.api}/${roleId}`,
      super.defaultHeader()
    );
  }
}
