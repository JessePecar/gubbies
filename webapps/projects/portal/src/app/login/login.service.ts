import { AuthClaims } from '@/models/auth';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiKey = process.env?.['API_KEY'];
  httpClient = inject(HttpClient);
  constructor() {}

  login(username: string, password: string) {
    // Http Call here
    return this.httpClient.post<string>('/api/auth', {
      username,
      password,
    });
  }
}
