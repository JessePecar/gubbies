import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from 'src/common/repository';
import { SharedService } from 'src/common/service';

@Module({
  imports: [RepositoryModule],
  providers: [
    VendorsService,
    VendorsResolver,
    RepositoryService,
    SharedService,
  ],
})
export class VendorsModule {}
