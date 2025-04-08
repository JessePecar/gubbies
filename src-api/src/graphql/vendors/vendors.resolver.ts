import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VendorsService } from './vendors.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AppAuthGuard } from 'src/guards/app-auth.guard';
import { CreateVendorInput, UpdateVendorInput } from 'src/graphql.schema';

@Resolver('Vendors')
export class VendorsResolver {
  constructor(private readonly itemsService: VendorsService) {}

  @UseGuards(AppAuthGuard)
  @Query('vendors')
  async getVendors() {
    return this.itemsService.getVendors();
  }

  @UseGuards(AppAuthGuard)
  @Query('vendor')
  async getVendorById(@Args('id', ParseIntPipe) id: number) {
    return this.itemsService.getVendorById(id);
  }

  @UseGuards(AppAuthGuard)
  @Mutation('updateVendor')
  async updateVendor(
    @Args('updateVendorInput') updatedVendor: UpdateVendorInput,
  ) {}

  @UseGuards(AppAuthGuard)
  @Mutation('createVendor')
  async createVendor(
    @Args('createVendorInput') createVendor: CreateVendorInput,
  ) {}
}
