import { BaseController } from '@/core/requests/base-controller.service';
import { AuthClaims } from '@/models/auth';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService extends BaseController {
  readonly api = 'http://localhost:3002/auth';
  readonly httpClient = inject(HttpClient);

  public validate(token: string): Observable<AuthClaims> {
    return this.httpClient.get<AuthClaims>(this.api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
