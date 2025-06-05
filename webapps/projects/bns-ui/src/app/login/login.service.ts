import { User } from '@interfaces/settings/users';
import { inject, Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { AuthUserService } from './requests';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authUserService = inject(AuthUserService);

  constructor() {}

  authUser(username: string, password: string) {
    return this.authUserService.watch({
      username: username,
      password: password,
    }).valueChanges;
  }
}
