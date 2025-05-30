import { AuthClientService } from '@core/repository';
import { SharedService } from '@core/service';
import { AuthUtil } from '@core/utilities';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput, CreateUserInput } from '@bns/graphql.schema';

@Injectable()
export class UserService {
  authUtil = new AuthUtil();
  constructor(
    private repository: AuthClientService,
    private sharedService: SharedService<AuthClientService>,
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

  async getUsers() {
    return await this.repository.user.findMany({
      include: this.defaultInclude,
    });
  }

  async getUserById(id: number) {
    return await this.repository.user.findFirst({
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
      },
      where: {
        id: {
          equals: id,
        },
      },
    });
  }

  private async updateAddress(user: UpdateUserInput | CreateUserInput) {
    const { address } = user;
    return await this.sharedService.updateAddress(address);
  }

  private async updatePrimaryPhone(user: UpdateUserInput | CreateUserInput) {
    const { primaryPhone } = user;
    return await this.sharedService.updatePhone(primaryPhone);
  }

  async updateUser(user: UpdateUserInput) {
    // Update the address and primary phone at the same time
    const [address, primaryPhone] = await Promise.all([
      this.updateAddress(user),
      this.updatePrimaryPhone(user),
    ]);
    // Update the user information
    return await this.repository.user.upsert({
      where: {
        id: user.id,
      },
      update: {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        isActive: user.isActive ?? true,
        addressId: address?.id,
        primaryPhoneId: primaryPhone.id,
        roleId: user.roleId, // Change if the role Id is different
      },
      create: {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: await this.authUtil.hashPassword('password'),
        isActive: user.isActive ?? true,
        addressId: address?.id,
        primaryPhoneId: primaryPhone.id,
        roleId: user.roleId, // Change if the role Id is different
      },
      include: this.defaultInclude,
    });
  }

  async createUser(user: CreateUserInput) {
    const encryptedPassword = await this.authUtil.hashPassword(
      user.password ?? 'password',
    );
    // Update the address and primary phone at the same time
    const [address, primaryPhone] = await Promise.all([
      this.updateAddress(user),
      this.updatePrimaryPhone(user),
    ]);
    // Update the user information
    return await this.repository.user.create({
      data: {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: encryptedPassword,
        isActive: true,
        addressId: address?.id,
        primaryPhoneId: primaryPhone.id,
        roleId: user.roleId, // Change if the role Id is different
      },
      include: this.defaultInclude,
    });
  }
}
