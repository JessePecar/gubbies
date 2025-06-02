import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUtil } from '@core/utilities';
import { AuthClientService } from '@core/repository';
import { AuthClaimKeys, AuthClaims } from '@auth/auth';
import { UpdateUser } from '@auth/user';

@Injectable()
export class AuthService {
  private authUtil = new AuthUtil();
  constructor(
    private repository: AuthClientService,
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

  // Auth User will return the claims for a  user once they are logged in, we will never return the user object, just the claims
  async authUser(username: string, password: string) {
    // Encrypting the password
    const encryptedPassword = await this.authUtil.hashPassword(password);

    const userLogin = await this.repository.userLogin.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
      select: {
        password: true,
        user: {
          include: {
            userClaims: true,
          },
        },
      },
    });

    if (userLogin && userLogin.password === encryptedPassword) {
      userLogin.password = '';

      return userLogin.user[0].userClaims;
    }

    return undefined;
  }

  async verifyUser(token: string) {
    const decodedToken = this.jwtService.decode<AuthClaims>(token);

    if (decodedToken.userId === undefined) {
      throw new UnauthorizedException(
        'User is not authorized for the application',
      );
    }

    // This will need to change to be returning the claims
    const userClaims = await this.repository.userClaim.findMany({
      where: {
        userId: {
          equals: +decodedToken.userId,
        },
      },
    });

    // We are validating the content of the token, we will do a loop check to ensure the claims in the token are equal to that of the database
    if (
      userClaims.some((uc) => uc.value !== decodedToken[AuthClaimKeys[uc.code]])
    ) {
      throw new UnauthorizedException(
        'User is not authorized for the application, see administrator for details',
      );
    }

    return userClaims;
  }

  async updateUserClaims(user: UpdateUser) {
    const upsertTasks = Object.entries(AuthClaimKeys).map(([key, value]) => {
      return this.repository.userClaim.upsert({
        where: {
          code_userId: {
            code: key,
            userId: user.id,
          },
        },
        create: {
          code: key,
          userId: user.id,
          value: `${user[value]}`,
        },
        update: {
          value: `${user[value]}`,
        },
      });
    });

    return await Promise.all(upsertTasks);
  }

  async createAuthUser(user: UpdateUser, username: string, password: string) {
    const encryptedPassword = await this.authUtil.hashPassword(
      password ?? 'password',
    );

    await this.repository.userLogin.create({
      data: {
        password: encryptedPassword,
        userId: user.id,
        username: username,
      },
    });

    await this.updateUserClaims(user);
  }
}
