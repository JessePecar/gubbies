import { Injectable } from '@angular/core';
import Database from '@tauri-apps/plugin-sql';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'any',
})
export class UserDataService {
  database?: Database;

  async loadDatabase(dbName: string) {
    this.database = await Database.load(dbName);
  }

  constructor() {}

  async authUser(username: string, password: string) {
    if (this.database === undefined)
      await this.loadDatabase('sqlite:gubbies.db');

    return this.database?.select<User>(
      'SELECT * FROM users WHERE username = $1 AND passwordHash = $2',
      [username, password]
    );
  }
}
