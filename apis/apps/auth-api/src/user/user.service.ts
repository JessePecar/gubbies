import { AuthClientService } from '@core/repository';
import { AuthUtil } from '@core/utilities';
import { Injectable } from '@nestjs/common';
import {
  UpdateUserInput,
  CreateUserInput,
  UpdatePhoneInput,
  CreatePhoneInput,
  UpdateAddressInput,
  CreateAddressInput,
} from '@bns/graphql.schema';

@Injectable()
export class UserService {
  authUtil = new AuthUtil();
  constructor(private repository: AuthClientService) {}

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

  private async updatePrimaryPhone(user: UpdateUserInput | CreateUserInput) {
    const { primaryPhone } = user;
    return await this.updatePhone(primaryPhone);
  }

  async updateUser(user: UpdateUserInput) {
    // Update the address and primary phone at the same time
    const [address, primaryPhone] = await Promise.all([
      this.updateAddress(user.address),
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
      this.updateAddress(user.address),
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

  async updateAddress(
    address?: UpdateAddressInput | CreateAddressInput | null,
  ) {
    if (address !== null && address !== undefined) {
      // If we are using the update user input, then we will perform an upsert
      const dataObject = {
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
      };

      if (address instanceof UpdateAddressInput) {
        const updateObject = {
          where: {
            id: address.id,
          },
          ...dataObject,
        };

        return await this.repository.address.upsert(updateObject);
      }
      // If we are using the create user input, then we will perform a create
      else {
        return await this.repository.address.create({
          data: dataObject.create,
        });
      }
    }
    // If the address is null or undefined, then create a blank address
    else {
      const createObject = {
        address1: '',
        city: '',
        countryCode: 'US',
        state: '',
        address2: undefined,
        postalCode: 0,
      };

      return await this.repository.address.create({
        data: createObject,
      });
    }
  }

  async updatePhone(phone?: UpdatePhoneInput | CreatePhoneInput | null) {
    if (phone !== null && phone !== undefined) {
      const dataObject = {
        create: {
          nationalDigits: phone.nationalDigits,
          rawDigits: phone.rawDigits,
        },
        update: {
          nationalDigits: phone.nationalDigits,
          rawDigits: phone.rawDigits,
        },
      };

      // If user is an update user input, then run an upsert
      if (phone instanceof UpdatePhoneInput) {
        const updateObject = {
          ...dataObject,
          where: {
            id: phone.id,
          },
        };
        return await this.repository.phone.upsert(updateObject);
      }
      // If user is create user input, then run a create
      else {
        return await this.repository.phone.create({
          data: dataObject.create,
        });
      }
    } else {
      // Create a default object that holds empty strings since the admin user doesn't have a phone attached :)
      const createObject = {
        data: {
          nationalDigits: '',
          rawDigits: '',
        },
      };

      return await this.repository.phone.create(createObject);
    }
  }
}
