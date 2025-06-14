import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/portal:env/environment';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  httpClient = inject(HttpClient);
  constructor() {}

  invalidateSession(sessionId: string) {
    // Http Call here
    const encodedSessionId = encodeURIComponent(sessionId);
    return this.httpClient.get<boolean>(
      `${environment.authApi}/auth/invalidateKey?key=${encodedSessionId}`
    );
  }
}
