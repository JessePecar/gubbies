import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  imports: [RepositoryModule],
  exports: [],
  providers: [ItemsService, RepositoryService],
  controllers: [ItemsController],
})
export class ItemsModule {}
