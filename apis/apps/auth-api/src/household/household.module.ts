import { Module } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { AuthClientService, AuthRepositoryModule } from '@core/repository';
import { HouseholdController } from '@auth/household/household.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@core/strategy';

@Module({
  imports: [AuthRepositoryModule],
  providers: [
    HouseholdService,
    HouseholdController,
    AuthClientService,
    JwtService,
    JwtStrategy
  ],
})
export class HouseholdModule {}
