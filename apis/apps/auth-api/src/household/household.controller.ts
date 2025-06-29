import { BaseHousehold, Household } from '@auth/household/household.types';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('household')
export class HouseholdController {
  
  // TODO: Should grab the requesting user's household
  @Get()
  async getHousehold() {
    
  }

  @Get('users')
  async getHouseholdUsers() {

  }

  @Put('addUser')
  async addUserToHousehold(@Query('userId') userId: number, @Query('householdId') householdId: number) {

  }

  @Post()
  async createHousehold(@Body() household: BaseHousehold) {

  }

  @Put()
  async updateHousehold(@Body() household: Household) {

  }

  @Delete('retire/:id')
  async retireHousehold(@Param('id') householdId) {

  }
}
