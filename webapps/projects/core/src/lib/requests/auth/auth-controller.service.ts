import { ApiSettingsService } from '@/core/requests/api-settings.service';
import { BaseController } from '@/core/requests/base-controller.service';
import { AuthClaims } from '@/models/auth';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService extends BaseController {
  readonly apiSetting = inject(ApiSettingsService);
  readonly httpClient = inject(HttpClient);

  public validate(token: string): Observable<AuthClaims> {
    return this.httpClient.get<AuthClaims>(`${this.apiSetting.authApi()}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public authUser(username: string, password: string): Observable<string> {
    return this.httpClient.post<string>(`${this.apiSetting.authApi()}/auth`, {
      username,
      password,
    });
  }
}
