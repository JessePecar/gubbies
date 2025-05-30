import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VendorsService } from './vendors.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AppAuthGuard } from '@core/guards';
import { CreateVendorInput, UpdateVendorInput } from '@bns/graphql.schema';

@Resolver('Vendors')
export class VendorsResolver {
  constructor(private readonly vendorsService: VendorsService) {}

  @UseGuards(AppAuthGuard)
  @Query('vendors')
  async getVendors() {
    const vendors = await this.vendorsService.getVendors();

    return vendors;
  }

  @UseGuards(AppAuthGuard)
  @Query('vendor')
  async getVendorById(@Args('id', ParseIntPipe) id: number) {
    return await this.vendorsService.getVendorById(id);
  }

  @UseGuards(AppAuthGuard)
  @Mutation('updateVendor')
  async updateVendor(
    @Args('updateVendorInput') updatedVendor: UpdateVendorInput,
  ) {
    return await this.vendorsService.updateVendor(updatedVendor);
  }

  @UseGuards(AppAuthGuard)
  @Mutation('createVendor')
  async createVendor(
    @Args('createVendorInput') createVendor: CreateVendorInput,
  ) {
    return await this.vendorsService.createVendor(createVendor);
  }
}
