import { Injectable } from '@angular/core';
import Database from '@tauri-apps/plugin-sql';
import { User } from '../entities/user';
import { Permission } from '../entities/role';

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

    const users = await this.database?.select<User[]>(
      'SELECT * FROM users WHERE username = $1 AND passwordHash = $2',
      [username, password]
    );

    var user: User | undefined = undefined;
    if (users !== undefined && users.length > 0) {
      user = users![0];
    }

    if (user !== undefined) {
      user.permissions =
        (await this.database?.select<Permission[]>(
          'SELECT permissionId FROM rolePermissions WHERE roleId = $1',
          [user.roleId]
        )) ?? ([] as Permission[]);
    }

    console.log(user);

    return user;
  }
}
