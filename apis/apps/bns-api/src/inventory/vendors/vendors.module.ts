import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { Module } from '@nestjs/common';
import { BnsRepositoryModule } from '@core/repository';
import { JwtStrategy } from '@core/strategy';

@Module({
  imports: [BnsRepositoryModule],
  providers: [VendorsService, VendorsResolver, JwtStrategy],
})
export class VendorsModule {}
