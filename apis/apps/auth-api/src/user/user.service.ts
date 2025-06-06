import { AuthClientService, AuthClientTransaction } from '@core/repository';
import { AuthUtil } from '@core/utilities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '@auth/auth';
import { CreateUser, UpdateUser, User } from '@auth/user';
import { Address, Phone } from '@core/interfaces';

@Injectable()
export class UserService {
  authUtil = new AuthUtil();
  constructor(
    private repository: AuthClientService,
    private authService: AuthService,
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
          equals: +id,
        },
      },
    });
  }

  private async updatePrimaryPhone(
    transaction: AuthClientTransaction,
    user: User,
  ) {
    const { primaryPhone } = user;
    return await this.updatePhone(transaction, primaryPhone);
  }

  async updateUser(user: UpdateUser) {
    // If the user's id provided is null, we should throw an exception that the request was bad
    if (user.id === null) {
      throw new BadRequestException(
        'Cannot update user without an existing id',
      );
    }

    return await this.repository.$transaction(async (transaction) => {
      // Update the address and primary phone at the same time
      const [address, primaryPhone] = await Promise.all([
        this.updateAddress(transaction, user.address),
        this.updatePrimaryPhone(transaction, user),
      ]);

      // Update the user information
      const updatedUser = await transaction.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailAddress: user.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          isActive: user.isActive ?? true,
          addressId: address?.id,
          primaryPhoneId: primaryPhone.id,
          roleId: user.roleId, // Change if the role Id is different
        },
        include: this.defaultInclude,
      });

      if (updatedUser) {
        await this.authService.updateUserClaims(user, transaction);
      }

      return updatedUser;
    });
  }

  async createUser(user: CreateUser) {
    // Update the address and primary phone at the same time
    this.repository.$transaction(async (transaction) => {
      const [address, primaryPhone] = await Promise.all([
        this.updateAddress(transaction, user.address),
        this.updatePrimaryPhone(transaction, user),
      ]);

      // Create the user information
      const newUser = await transaction.user.create({
        data: {
          applicationId: user.applicationId,
          emailAddress: user.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          isActive: true,
          addressId: address?.id,
          primaryPhoneId: primaryPhone.id,
          roleId: user.roleId, // Change if the role Id is different
        },
        include: this.defaultInclude,
      });

      // Create the Auth Info
      await this.authService.createAuthUser(
        newUser as UpdateUser,
        user.username,
        user.password,
        transaction,
      );

      return newUser;
    });
  }

  async updateAddress(
    transaction: AuthClientTransaction,
    address?: Address | null,
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

      if (address.id !== null) {
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
        return await transaction.address.create({
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

      return await transaction.address.create({
        data: createObject,
      });
    }
  }

  async updatePhone(transaction: AuthClientTransaction, phone?: Phone | null) {
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
      if (phone.id !== null) {
        const updateObject = {
          ...dataObject,
          where: {
            id: phone.id,
          },
        };
        return await transaction.phone.upsert(updateObject);
      }
      // If user is create user input, then run a create
      else {
        return await transaction.phone.create({
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

      return await transaction.phone.create(createObject);
    }
  }
}
