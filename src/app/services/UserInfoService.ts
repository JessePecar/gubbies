import { HostListener, Injectable, signal } from '@angular/core';
import { load, Store } from '@tauri-apps/plugin-store';
import { User } from '../entities/user';
import { window } from '@tauri-apps/api';

@Injectable({
  providedIn: 'platform',
})
export class UserInfoService {
  public userInfo = signal<User | undefined>(undefined);
  userInfoStorage?: Store = undefined;

  async setUser(newUserInfo?: User) {
    if (newUserInfo === undefined) {
      this.userInfo = signal<User | undefined>(undefined);
    } else {
      this.userInfo.set(newUserInfo);
    }

    if (this.userInfoStorage) {
      if (newUserInfo) {
        await this.userInfoStorage.set('userInfo', newUserInfo);
      } else {
        await this.userInfoStorage.delete('userInfo');
      }

      await this.userInfoStorage.save();
    }
  }

  async setupStore() {
    if (!window) {
      setTimeout(async () => await this.setupStore(), 100);
      return;
    }

    this.userInfoStorage = await load('localStorage.json');
    const res = await this.userInfoStorage?.get<User | undefined>('userInfo');

    console.log('Store info: ' + JSON.stringify(res));

    if (res) {
      this.userInfo.set(res);
    }
  }
}
