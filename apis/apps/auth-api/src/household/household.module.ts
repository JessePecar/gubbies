import { Module } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { AuthClientService, AuthRepositoryModule } from '@core/repository';
import { HouseholdController } from '@auth/household/household.controller';

@Module({
  imports: [AuthRepositoryModule],
  providers: [HouseholdService, HouseholdController, AuthClientService],
})
export class ChainModule {}
