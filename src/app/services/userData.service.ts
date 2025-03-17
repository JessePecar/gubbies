import { inject, Injectable } from '@angular/core';
import { User } from '@interfaces/settings/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  private readonly httpHeaders = new HttpHeaders({
    accepts: 'application/json',
  });

  authUser(username: string, password: string): Observable<User | undefined> {
    const requestUrl = `${this.baseUrl}/users/authUser?username=${username}&password=${password}`;
    return this.httpClient.get<User | undefined>(requestUrl, {
      headers: this.httpHeaders,
    });
  }
}
