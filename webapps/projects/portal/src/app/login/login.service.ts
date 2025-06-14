import { AuthClaims } from '@/models/auth';
import { Application } from '@/models/auth/application';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/portal:env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpClient = inject(HttpClient);
  constructor() {}

  login(username: string, password: string) {
    // Http Call here
    return this.httpClient.post<{
      sessionId: string;
      token: string;
    }>(
      `${environment.authApi}/auth`, // This will translate to 'auth-api/auth'
      {
        username,
        password,
      }
    );
  }

  getUserClaims(token: string) {
    return this.httpClient.get<AuthClaims>(`${environment.authApi}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getRedirectLink(applicationId: string) {
    return this.httpClient.get<Application>(
      `${environment.authApi}/application?id=${applicationId}`
    );
  }
}
