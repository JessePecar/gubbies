import { Inject, Injectable } from '@nestjs/common';
import {
  CreateAddressInput,
  CreatePhoneInput,
  CreateVendorInput,
  UpdateAddressInput,
  UpdatePhoneInput,
  UpdateVendorInput,
} from '@bns/graphql.schema';
import { BnsClientService } from '@core/repository';

@Injectable()
export class VendorsService {
  constructor(private repository: BnsClientService) {}

  defaultIncludes = {
    address: true,
    primaryPhone: true,
    secondaryPhone: true,
  };

  async getVendors() {
    return await this.repository.vendor.findMany({
      include: this.defaultIncludes,
    });
  }

  async getVendorById(id: number) {
    return await this.repository.vendor.findFirst({
      include: this.defaultIncludes,
      where: {
        id: {
          equals: id,
        },
      },
    });
  }

  async upsertVendorsChildren(vendor: UpdateVendorInput | CreateVendorInput) {
    const isUpdate = vendor instanceof UpdateVendorInput;

    let address = {
      id: isUpdate ? (vendor as UpdateVendorInput).addressId : 1,
    };
    let primaryPhone = {
      id: isUpdate ? (vendor as UpdateVendorInput).primaryPhoneId : 1,
    };
    let secondaryPhone = {
      id: isUpdate ? (vendor as UpdateVendorInput).secondaryPhoneId : 1,
    };

    if (vendor.address) {
      address = await this.updateAddress(vendor.address);
    }

    if (vendor.primaryPhone) {
      primaryPhone = await this.updatePhone(vendor.primaryPhone);
    }

    if (vendor.secondaryPhone) {
      secondaryPhone = await this.updatePhone(vendor.secondaryPhone);
    }

    return {
      address,
      primaryPhone,
      secondaryPhone,
    };
  }

  async updateVendor(vendor: UpdateVendorInput) {
    const { address, primaryPhone, secondaryPhone } =
      await this.upsertVendorsChildren(vendor);

    return this.repository.vendor.update({
      where: {
        id: parseInt(vendor.id),
      },
      data: {
        name: vendor.name!,
        note: vendor.notes!,
        addressId: address.id,
        primaryPhoneId: primaryPhone.id,
        secondaryPhoneId: secondaryPhone.id,
      },
    });
  }

  async createVendor(vendor: CreateVendorInput) {
    const { address, primaryPhone, secondaryPhone } =
      await this.upsertVendorsChildren(vendor);

    return this.repository.vendor.create({
      data: {
        name: vendor.name!,
        note: vendor.notes!,
        addressId: address.id,
        primaryPhoneId: primaryPhone.id,
        secondaryPhoneId: secondaryPhone.id,
      },
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
