import { Injectable } from '@nestjs/common';
import { PermissionType } from 'src/entities';
import { RepositoryService } from 'src/repository/repository.service';

@Injectable()
export class UsersService {
  constructor(private repository: RepositoryService) {}

  async getUsers() {
    return await this.repository.users.findMany({
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getUserById(id: number) {
    return await this.repository.users.findFirst({
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id: {
          equals: id,
        },
      },
    });
  }

  async authUser(username: string, password: string) {
    return await this.repository.users.findFirst({
      where: {
        userName: username,
        password: password,
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              select: {
                permissionId: true,
              },
            },
          },
        },
      },
    });
  }
}
