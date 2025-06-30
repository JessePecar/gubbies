import { HouseholdService } from '@auth/household/household.service';
import { BaseHousehold, Household } from '@auth/household/household.types';
import { AppAuthGuard } from '@core/guards';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

@Controller('household')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {

  }
  
  // TODO: Should grab the requesting user's household
  @Get()
  @UseGuards(AppAuthGuard)
  async getHousehold() {
    // Get the user id from the request
    return await this.householdService.getHousehold();
  }

  @Get('users')
  @UseGuards(AppAuthGuard)
  async getHouseholdUsers() {
    // Get the user's household id

    return await this.householdService.getHouseholdUsers();
  }

  @Put('addUser')
  @UseGuards(AppAuthGuard)
  async addUserToHousehold(@Query('userId') userId: number, @Query('householdId') householdId: number) {

    return await this.householdService.addUserToHousehold(userId, householdId);
  }

  @Post()
  @UseGuards(AppAuthGuard)
  async createHousehold(@Body() household: BaseHousehold) {

    return await this.householdService.createHousehold(household);
  }

  @Put()
  @UseGuards(AppAuthGuard)
  async updateHousehold(@Body() household: Household) {

    return await this.householdService.updateHousehold(household);
  }

  @Delete('retire/:id')
  @UseGuards(AppAuthGuard)
  async retireHousehold(@Param('id') householdId) {

    return await this.retireHousehold(householdId);
  }
}
