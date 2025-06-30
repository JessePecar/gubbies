import { BaseHousehold, Household } from '@auth/household/household.types';
import { User } from '@auth/user';
import { AuthClientService } from '@core/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HouseholdService {
  constructor(private repository: AuthClientService) { }
  
  // TODO: Should grab the requesting user's household
  async getHousehold() {
    const household = await this.repository.household.findFirstOrThrow({
      where: {
        id: {
          equals: 1
        }
      }
    });

    return household as Household;
  }

  // Get the list of users that exist on a household
  // In app, this will be for household management by the household owner
  // The household id will be grabbed from the user object that is populated in the User decorator
  async getHouseholdUsers() {
    const userResponse = await this.repository.householdUsers.findMany({
      where: {
        householdId: {
          equals: 1
        }
      },
      select: {
        user: true
      }
    });

    return userResponse.map(ur => ur.user) as User[];
  }

  async addUserToHousehold(userId: number, householdId: number) {}

  async createHousehold(household: BaseHousehold) {}

  async updateHousehold(household: Household) {}

  async retireHousehold(householdId: number) {}
}
