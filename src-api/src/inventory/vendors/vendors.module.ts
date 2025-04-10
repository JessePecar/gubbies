import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { Module } from '@nestjs/common';
import {
  RepositoryService,
  RepositoryModule,
  SharedService,
} from 'src/repository';

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
