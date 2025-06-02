import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from '@auth/store/store.controller';
import { AuthClientService, AuthRepositoryModule } from '@core/repository';

@Module({
  imports: [AuthRepositoryModule],
  providers: [StoreService, StoreController, AuthClientService],
})
export class StoreModule {}
