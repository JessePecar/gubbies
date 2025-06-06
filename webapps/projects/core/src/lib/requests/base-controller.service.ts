import { LocalStorageKeys } from '@/core/constants';
import { HttpClient } from '@angular/common/http';

export abstract class BaseController {
  protected abstract api: string;
  protected abstract httpClient: HttpClient;

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
