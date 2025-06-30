import { BaseHousehold, Household } from '@auth/household/household.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HouseholdService {
  // TODO: Should grab the requesting user's household
  async getHousehold() {}

  async getHouseholdUsers() {}

  async addUserToHousehold(userId: number, householdId: number) {}

  async createHousehold(household: BaseHousehold) {}

  async updateHousehold(household: Household) {}

  async retireHousehold(householdId: number) {}
}
