import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from 'src/graphql.schema';
import { RepositoryService } from 'src/repository/repository.service';

import { AuthUtil } from 'src/utilities/authUtils';

@Injectable()
export class UsersService {
  authUtil = new AuthUtil();
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
    if (address !== null && address !== undefined) {
      // If we are using the update user input, then we will perform an upsert
      if (user instanceof UpdateUserInput) {
        return await this.repository.address.upsert({
          where: {
            id: address.id,
          },
          create: {
            address1: address.address1,
            city: address.city,
            countryCode: address.countryCode,
            state: address.state,
            address2: address.address2,
            postalCode: address.postalCode,
          },
          update: {
            address1: address.address1,
            city: address.city,
            countryCode: address.countryCode,
            state: address.state,
            address2: address.address2,
            postalCode: address.postalCode,
          },
        });
      }
      // If we are using the create user input, then we will perform a create
      else {
        return await this.repository.address.create({
          data: {
            address1: address.address1,
            city: address.city,
            countryCode: address.countryCode,
            state: address.state,
            address2: address.address2,
            postalCode: address.postalCode,
          },
        });
      }
    }
    // If the address is null or undefined, then create a blank address
    else {
      return await this.repository.address.create({
        data: {
          address1: '',
          city: '',
          countryCode: 'US',
          state: '',
          address2: undefined,
          postalCode: 0,
        },
      });
    }
  }

  private async updatePrimaryPhone(user: UpdateUserInput | CreateUserInput) {
    const { primaryPhone } = user;

    if (primaryPhone !== null && primaryPhone !== undefined) {
      // If user is an update user input, then run an upsert
      if (primaryPhone instanceof UpdateUserInput) {
        return await this.repository.phone.upsert({
          where: {
            id: primaryPhone.id,
          },
          create: {
            nationalDigits: primaryPhone.nationalDigits,
            rawDigits: primaryPhone.rawDigits,
          },
          update: {
            nationalDigits: primaryPhone.nationalDigits,
            rawDigits: primaryPhone.rawDigits,
          },
        });
      }
      // If user is create user input, then run a create
      else {
        return await this.repository.phone.create({
          data: {
            nationalDigits: primaryPhone.nationalDigits,
            rawDigits: primaryPhone.rawDigits,
          },
        });
      }
    } else {
      // Create a default object that holds empty strings since the admin user doesn't have a phone attached :)
      return await this.repository.phone.create({
        data: {
          nationalDigits: '',
          rawDigits: '',
        },
      });
    }
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
