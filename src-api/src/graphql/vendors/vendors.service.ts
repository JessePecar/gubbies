import { Injectable } from '@nestjs/common';
import { CreateVendorInput, UpdateVendorInput } from 'src/graphql.schema';
import { RepositoryService, SharedService } from 'src/repository';

@Injectable()
export class VendorsService {
  constructor(
    private repository: RepositoryService,
    private sharedService: SharedService,
  ) {}

  defaultIncludes = {
    address: true,
    primaryPhone: true,
    secondaryPhone: true,
  };

  async getVendors() {
    return this.repository.vendor.findMany({
      include: this.defaultIncludes,
    });
  }

  async getVendorById(id: number) {
    return this.repository.vendor.findFirst({
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

    let address = { id: isUpdate ? vendor.addressId : 1 };
    let primaryPhone = { id: isUpdate ? vendor.primaryPhoneId : 1 };
    let secondaryPhone = { id: isUpdate ? vendor.secondaryPhoneId : 1 };

    if (vendor.address) {
      address = await this.sharedService.updateAddress(vendor.address, true);
    }

    if (vendor.primaryPhone) {
      primaryPhone = await this.sharedService.updatePhone(
        vendor.primaryPhone,
        true,
      );
    }

    if (vendor.secondaryPhone) {
      secondaryPhone = await this.sharedService.updatePhone(
        vendor.secondaryPhone,
        true,
      );
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
}
