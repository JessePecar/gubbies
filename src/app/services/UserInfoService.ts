import { Injectable, signal } from '@angular/core';
import { UserInfo } from '../interfaces/user';
import { load, Store } from '@tauri-apps/plugin-store';

@Injectable({
  providedIn: 'platform',
})
export class UserInfoService {
  public userInfo = signal<UserInfo | undefined>(undefined);
  userInfoStorage?: Store = undefined;

  async setUser(newUserInfo?: UserInfo) {
    this.userInfo.set(newUserInfo);

    if (this.userInfoStorage) {
      await this.userInfoStorage.set('userInfo', newUserInfo);

      await this.userInfoStorage.save();
    }
  }

  async setupStore() {
    if (typeof window !== 'undefined') {
      console.log('Setting up the store');
      this.userInfoStorage = await load('localStorage.json');

      const userInfo = await this.userInfoStorage.get<UserInfo | undefined>(
        'userInfo'
      );

      console.log('Store info: ' + JSON.stringify(userInfo));
      if (userInfo) {
        this.userInfo.set(userInfo);
      }
    }
  }

  constructor() {
    this.setupStore();
  }
}
