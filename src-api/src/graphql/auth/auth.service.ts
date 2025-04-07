import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositoryService } from 'src/repository/repository.service';
import { AuthUtil } from 'src/utilities/authUtils';

export type AuthModel = {
  sub: number;
  roleId: number;
};

@Injectable()
export class AuthService {
  private authUtil = new AuthUtil();
  constructor(
    private repository: RepositoryService,
    private readonly jwtService: JwtService,
  ) {}

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
    const encryptedPassword = await this.authUtil.hashPassword(password);

    const user = await this.repository.users.findFirst({
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

  async verifyUser(token: string) {
    const decodedToken = this.jwtService.decode<AuthModel>(token);

    const user = await this.repository.users.findFirst({
      where: {
        AND: {
          id: {
            equals: decodedToken.sub,
          },
          roleId: {
            equals: decodedToken.roleId,
          },
        },
      },
      include: this.defaultInclude,
    });

    return user;
  }

  async authTokenInfo(userId: number, roleId: number) {
    const user = await this.repository.users.findFirst({
      where: {
        AND: {
          id: {
            equals: userId,
          },
          roleId: {
            equals: roleId,
          },
        },
      },
      include: this.defaultInclude,
    });

    return user;
  }
}
