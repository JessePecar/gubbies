import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from 'src/graphql.schema';
import { SharedService } from 'src/repository';
import { RepositoryService } from 'src/repository/repository.service';

import { AuthUtil } from 'src/utilities/authUtils';

@Injectable()
export class UsersService {
  authUtil = new AuthUtil();
  constructor(
    private repository: RepositoryService,
    private sharedService: SharedService,
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
    return await this.repository.users.findMany({
      include: this.defaultInclude,
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
    return this.sharedService.updateAddress(
      address,
      user instanceof UpdateUserInput,
    );
  }

  private async updatePrimaryPhone(user: UpdateUserInput | CreateUserInput) {
    const { primaryPhone } = user;

    return this.sharedService.updatePhone(
      primaryPhone,
      user instanceof UpdateUserInput,
    );
  }

  async updateUser(user: UpdateUserInput) {
    // Update the address and primary phone at the same time
    const [address, primaryPhone] = await Promise.all([
      this.updateAddress(user),
      this.updatePrimaryPhone(user),
    ]);

    // Update the user information
    return await this.repository.users.upsert({
      where: {
        id: user.id,
      },
      update: {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        isActive: user.isActive ?? true,
        addressId: address.id,
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
        addressId: address.id,
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
    return await this.repository.users.create({
      data: {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: encryptedPassword,
        isActive: true,
        addressId: address.id,
        primaryPhoneId: primaryPhone.id,
        roleId: user.roleId, // Change if the role Id is different
      },
      include: this.defaultInclude,
    });
  }
}
