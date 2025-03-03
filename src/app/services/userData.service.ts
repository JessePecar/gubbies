import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'any',
})
export class UserDataService {
  constructor() {}

  async authUser(
    username: string,
    password: string
  ): Promise<User | undefined> {
    // TODO: Transition this to hit a local express.js backend service that will run in tandem
    return undefined;
  }
}
