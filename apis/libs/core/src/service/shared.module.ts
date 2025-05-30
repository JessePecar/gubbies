import { Module } from '@nestjs/common';
import { RepositoryModule, BnsClientService } from '@core/repository';
import { SharedService } from '@core/service';

@Module({
  imports: [RepositoryModule],
  providers: [SharedService, BnsClientService],
})
export class SharedModule {}
