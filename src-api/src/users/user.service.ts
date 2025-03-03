import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionType, User } from 'src/entities';
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

    if (userEntity && userEntity.role) {
      const permissionTypes = userEntity.role.permissions?.map(
        (p) => p.permissionId as PermissionType,
      );

      return {
        ...userEntity,
        role: {
          permissions: permissionTypes,
        },
      };
    }

    return null;
  }
}
