import { Injectable, signal } from '@angular/core';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'platform',
})
export class UserInfoService {
  public userInfo = signal<User | undefined>(undefined);

  async setUser(newUserInfo?: User) {}

  async setupStore() {}
}
