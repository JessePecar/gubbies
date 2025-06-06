import { BaseController } from '@/core/requests';
import { User } from '@/models/auth/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService extends BaseController {
  readonly api = 'http://localhost:3002/user';
  readonly httpClient = inject(HttpClient);

  public getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(
      `${this.api}/${userId}`,
      super.defaultHeader()
    );
  }
}
