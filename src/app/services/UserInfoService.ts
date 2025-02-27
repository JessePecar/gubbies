import { Injectable, signal } from '@angular/core';
import { load, Store } from '@tauri-apps/plugin-store';
import { Router } from '@angular/router';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private router: Router;

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
    if (typeof window !== 'undefined') {
      console.log('Setting up the store');
      this.userInfoStorage = await load('localStorage.json');
      const userInfo = await this.userInfoStorage.get<User[] | undefined>(
        'userInfo'
      );

      console.log('Store info: ' + JSON.stringify(userInfo && userInfo[0]));
      if (userInfo) {
        this.userInfo.set(userInfo[0]);
        var currentRoute = this.router.url;

        // Navigate back to home if already logged in
        if (currentRoute.includes('login')) {
          this.router.navigate(['']);
        }
      }
    }
  }

  constructor(r: Router) {
    this.router = r;
    this.setupStore();
  }
}
