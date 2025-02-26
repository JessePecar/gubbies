import { inject, Injectable, signal } from '@angular/core';
import { UserInfo } from '../interfaces/user';
import { load, Store } from '@tauri-apps/plugin-store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private router: Router;
  
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
        var currentRoute = this.router.url;

        // Navigate back to home if already logged in
        if (currentRoute.includes("login")) {
          this.router.navigate([""]);
        }
      }
    }
  }

  constructor(r: Router) {
    this.router = r;
    this.setupStore();
  }
}
