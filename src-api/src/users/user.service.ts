import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async authUser(username: string, password: string) {
    return {};
  }
}
