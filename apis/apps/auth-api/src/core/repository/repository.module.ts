import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Module({
  imports: [],
  exports: [],
  providers: [RepositoryService],
  controllers: [],
})
export class RepositoryModule {}
