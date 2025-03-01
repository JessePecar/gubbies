import { HostListener, Injectable, signal } from '@angular/core';
import { load, Store } from '@tauri-apps/plugin-store';
import { User } from '../entities/user';
import { from } from 'rxjs';

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

  setupStore() {
    from(load('localStorage')).subscribe(uis => {
      this.userInfoStorage = uis;
      from(this.userInfoStorage?.get<User[] | undefined>('userInfo')).subscribe(
        res => {
          console.log('Store info: ' + JSON.stringify(res && res[0]));

          if (res) {
            this.userInfo.set(res[0]);
          }
        }
      );
    });
  }

  waitForWindowLoad() {
    while (window === undefined) {
      setTimeout(() => {
        this.waitForWindowLoad();
      }, 150);
    }
  }

  constructor() {
    this.waitForWindowLoad();
  }
}
