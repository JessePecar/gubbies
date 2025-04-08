import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from 'src/repository';

@Module({
  imports: [RepositoryModule],
  providers: [VendorsService, VendorsResolver, RepositoryService],
})
export class VendorsModule {}
