import { Injectable } from '@nestjs/common';
import { RepositoryService } from '.';
import { UpdateAddressInput, UpdatePhoneInput } from 'src/graphql.schema';

@Injectable()
export class SharedService {
  constructor(private repository: RepositoryService) {}

  async updateAddress(
    address?: UpdateAddressInput | null,
    isUpdate: boolean = true,
  ) {
    if (address !== null && address !== undefined) {
      // If we are using the update user input, then we will perform an upsert
      if (isUpdate) {
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

  async updatePhone(phone?: UpdatePhoneInput | null, isUpdate: boolean = true) {
    if (phone !== null && phone !== undefined) {
      // If user is an update user input, then run an upsert
      if (isUpdate) {
        return await this.repository.phone.upsert({
          where: {
            id: phone.id,
          },
          create: {
            nationalDigits: phone.nationalDigits,
            rawDigits: phone.rawDigits,
          },
          update: {
            nationalDigits: phone.nationalDigits,
            rawDigits: phone.rawDigits,
          },
        });
      }
      // If user is create user input, then run a create
      else {
        return await this.repository.phone.create({
          data: {
            nationalDigits: phone.nationalDigits,
            rawDigits: phone.rawDigits,
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
}
