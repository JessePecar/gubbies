import { Module } from '@nestjs/common';
import { AdjustmentsService } from './adjustments.service';
import { AdjustmentsController } from './adjustments.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  imports: [RepositoryModule],
  exports: [],
  providers: [AdjustmentsService, RepositoryService],
  controllers: [AdjustmentsController],
})
export class AdjustmentsModule {}
