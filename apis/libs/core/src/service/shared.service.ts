import { Injectable } from '@nestjs/common';
import {
  CreateAddressInput,
  CreatePhoneInput,
  UpdateAddressInput,
  UpdatePhoneInput,
} from '@bns/graphql.schema';
import { BnsClientService, AuthClientService } from '@core/repository';

@Injectable()
export class SharedService<TRepo extends BnsClientService | AuthClientService> {
  constructor(private repository: TRepo) {}

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

        if (this.repository instanceof BnsClientService) {
          return await this.repository.address.upsert(updateObject);
        } else {
          return await this.repository.address.upsert(updateObject);
        }
      }
      // If we are using the create user input, then we will perform a create
      else {
        if (this.repository instanceof BnsClientService) {
          return await this.repository.address.create({
            data: dataObject.create,
          });
        } else {
          return await this.repository.address.create({
            data: dataObject.create,
          });
        }
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

      if (this.repository instanceof BnsClientService) {
        return await this.repository.address.create({
          data: createObject,
        });
      } else {
        return await this.repository.address.create({
          data: createObject,
        });
      }
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
        if (this.repository instanceof BnsClientService) {
          return await this.repository.phone.upsert(updateObject);
        } else {
          return await this.repository.phone.upsert(updateObject);
        }
      }
      // If user is create user input, then run a create
      else {
        if (this.repository instanceof BnsClientService) {
          return await this.repository.phone.create({
            data: dataObject.create,
          });
        } else {
          return await this.repository.phone.create({
            data: dataObject.create,
          });
        }
      }
    } else {
      // Create a default object that holds empty strings since the admin user doesn't have a phone attached :)
      const createObject = {
        data: {
          nationalDigits: '',
          rawDigits: '',
        },
      };

      if (this.repository instanceof BnsClientService) {
        return await this.repository.phone.create(createObject);
      } else {
        return await this.repository.phone.create(createObject);
      }
    }
  }
}
