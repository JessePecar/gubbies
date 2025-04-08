import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { SharedService } from './shared.service';

@Module({
  imports: [],
  exports: [],
  providers: [RepositoryService, SharedService],
  controllers: [],
})
export class RepositoryModule {}
