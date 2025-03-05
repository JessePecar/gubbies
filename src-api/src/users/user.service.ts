import { Injectable } from '@nestjs/common';
import { PermissionType } from 'src/entities';
import { RepositoryService } from 'src/repository/repository.service';

@Injectable()
export class UserService {
  constructor(private repository: RepositoryService) {}

  async authUser(username: string, password: string) {
    var userEntity = await this.repository.users.findFirst({
      where: {
        userName: username,
        password: password,
      },
      include: {
        role: {
          include: {
            rolePermissions: {},
          },
        },
      },
    });

    if (userEntity && userEntity.role) {
      const permissionTypes = userEntity.role.rolePermissions?.map(
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
