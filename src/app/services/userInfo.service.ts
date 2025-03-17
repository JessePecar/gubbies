import { Injectable, signal } from '@angular/core';
import { User } from '@interfaces/settings/users';

@Injectable({
  providedIn: 'platform',
})
export class UserInfoService {
  private readonly localStorageKey = 'userInfo';
  public userInfo = signal<User | undefined>(undefined);

  async setUser(newUserInfo?: User) {
    this.userInfo.set(newUserInfo);

    if (newUserInfo) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(newUserInfo));
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
  }

  async setupStore() {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      const userInfoStore = JSON.parse(storedData);
      if (userInfoStore) {
        this.userInfo.set(userInfoStore);
      } else {
        localStorage.removeItem(this.localStorageKey);
      }
    }
  }
}
