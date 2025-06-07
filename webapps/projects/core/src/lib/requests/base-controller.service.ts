import { LocalStorageKeys } from '@/core/constants';
import { ApiSettingsService } from '@/core/requests/api-settings.service';
import { HttpClient } from '@angular/common/http';

export abstract class BaseController {
  protected abstract httpClient: HttpClient;
  protected abstract apiSetting: ApiSettingsService;

  private getToken() {
    return localStorage.getItem(LocalStorageKeys.access_token);
  }

  protected defaultHeader() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
  }
}
