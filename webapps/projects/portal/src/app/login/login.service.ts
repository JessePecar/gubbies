import { AuthClaims } from '@/models/auth';
import { Application } from '@/models/auth/application';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/portal:env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // apiKey = process.env?.['API_KEY'];
  httpClient = inject(HttpClient);
  constructor() {}

  login(username: string, password: string) {
    // Http Call here
    return this.httpClient.post<{
      token: string;
    }>(
      `${environment.authApi}/auth`,
      {
        username,
        password,
      },
      {
        headers: {
          'Allow-Origin': `http://${window.location.host}`,
        },
      }
    );
  }

  getUserClaims(token: string) {
    return this.httpClient.get<AuthClaims>(`${environment.authApi}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
        origin: window.location.hostname,
      },
    });
  }

  getRedirectLink(applicationId: string) {
    return this.httpClient.get<Application>(
      `${environment.authApi}/application?id=${applicationId}`,
      {
        headers: {
          origin: window.location.hostname,
        },
      }
    );
  }
}
