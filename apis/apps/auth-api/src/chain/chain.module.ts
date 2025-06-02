import { Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { AuthClientService, AuthRepositoryModule } from '@core/repository';
import { ChainController } from '@auth/chain/chain.controller';

@Module({
  imports: [AuthRepositoryModule],
  providers: [ChainService, ChainController, AuthClientService],
})
export class ChainModule {}
