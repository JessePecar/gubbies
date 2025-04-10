import { Module } from '@nestjs/common';
import { RepositoryModule, RepositoryService } from 'src/common/repository';
import { SharedService } from 'src/common/service';

@Module({
  imports: [RepositoryModule],
  providers: [SharedService, RepositoryService],
})
export class SharedModule {}
