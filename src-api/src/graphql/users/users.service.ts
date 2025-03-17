import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from 'src/graphql.schema';
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

  async authUser(username: string, password: string) {
    return await this.repository.users.findFirst({
      where: {
        AND: {
          userName: {
            equals: username,
          },
          password: { equals: password },
        },
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  private async updateAddress({ address }: UpdateUserInput) {
    if (address !== null && address !== undefined) {
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
    } else {
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

  private async updatePrimaryPhone({ primaryPhone }: UpdateUserInput) {
    if (primaryPhone !== null && primaryPhone !== undefined) {
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
    } else {
      // Create a default obect that holds empty strings since the admin user doesn't have a phone attached :)
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
    var [address, primaryPhone] = await Promise.all([
      this.updateAddress(user),
      this.updatePrimaryPhone(user),
    ]);

    console.log(address);
    console.log(primaryPhone);
    console.log(user);

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
        password: user.password,
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
        password: user.password,
        isActive: user.isActive ?? true,
        addressId: address.id,
        primaryPhoneId: primaryPhone.id,
        roleId: user.roleId, // Change if the role Id is different
      },
    });
  }
}
