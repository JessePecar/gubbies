import { AuthClaims } from '@/models/auth';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService {
  private readonly authApi = 'http://localhost:3002/auth';
  private readonly httpClient = inject(HttpClient);

  public validate(token: string): Observable<AuthClaims> {
    return this.httpClient.get<AuthClaims>(this.authApi, {
      headers: {
        Authorization: `Bearer ${token}`,
        origin: window.location.hostname,
      },
    });
  }
}
