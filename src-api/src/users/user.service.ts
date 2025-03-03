import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async authUser(username: string, password: string) {
    var userEntity = await this.usersRepository.findOne({
      where: {
        userName: username,
        password: password,
      },
      relations: {
        role: {
          permissions: {
            permission: {},
          },
        },
      },
    });

    return userEntity;
  }
}
