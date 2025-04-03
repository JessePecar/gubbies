import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { AuthUtil } from 'src/utilities/authUtils';

@Injectable()
export class AuthService {
  private authUtil = new AuthUtil();
  constructor(private repository: RepositoryService) {}

  private readonly defaultInclude = {
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
    address: {
      select: {
        address1: true,
        address2: true,
        city: true,
        countryCode: true,
        id: true,
        postalCode: true,
        state: true,
      },
    },
    primaryPhone: {
      select: {
        id: true,
        nationalDigits: true,
        rawDigits: true,
      },
    },
  };

  async authUser(username: string, password: string) {
    // Encrypting the password
    var encryptedPassword = await this.authUtil.hashPassword(password);

    var user = await this.repository.users.findFirst({
      where: {
        userName: {
          equals: username,
        },
      },
      include: this.defaultInclude,
    });

    if (user && user.password === encryptedPassword) {
      user.password = '';
      return user;
    }

    return undefined;
  }

  async verifyUser() {
    return false;
  }
}
