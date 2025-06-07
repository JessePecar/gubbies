import { BaseController } from '@/core/requests';
import { ApiSettingsService } from '@/core/requests/api-settings.service';
import { User } from '@/models/auth/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService extends BaseController {
  readonly apiSetting = inject(ApiSettingsService);
  readonly httpClient = inject(HttpClient);

  public getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(
      `${this.apiSetting.authApi()}/user/${userId}`,
      super.defaultHeader()
    );
  }
}
