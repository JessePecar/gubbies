import { AuthClientService } from '@core/repository';
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
          equals: id,
        },
      },
    });
  }

  private async updatePrimaryPhone(user: User) {
    const { primaryPhone } = user;
    return await this.updatePhone(primaryPhone);
  }

  async updateUser(user: UpdateUser) {
    // If the user's id provided is null, we should throw an exception that the request was bad
    if (user.id === null) {
      throw new BadRequestException(
        'Cannot update user without an existing id',
      );
    }

    // Update the address and primary phone at the same time
    const [address, primaryPhone] = await Promise.all([
      this.updateAddress(user.address),
      this.updatePrimaryPhone(user),
    ]);

    // Update the user information
    const updatedUser = await this.repository.user.update({
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
      await this.authService.updateUserClaims(user);
    }

    return updatedUser;
  }

  async createUser(user: CreateUser) {
    // Update the address and primary phone at the same time
    const [address, primaryPhone] = await Promise.all([
      this.updateAddress(user.address),
      this.updatePrimaryPhone(user),
    ]);

    try {
      // Create the user information
      const newUser = await this.repository.user.create({
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
      );

      return newUser;
    } catch (err) {
      await this.repository.address.delete({
        where: {
          id: address.id,
        },
      });

      await this.repository.phone.delete({
        where: {
          id: primaryPhone.id,
        },
      });

      throw err;
    }
  }

  async updateAddress(address?: Address | null) {
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

  async updatePhone(phone?: Phone | null) {
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
