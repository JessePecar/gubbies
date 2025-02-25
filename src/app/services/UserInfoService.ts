import { Injectable, signal } from "@angular/core";
import { UserInfo } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userInfo = signal<UserInfo | undefined>(undefined);

  setUser(newUserInfo?: UserInfo) {
    this.userInfo.set(newUserInfo);
  }
}