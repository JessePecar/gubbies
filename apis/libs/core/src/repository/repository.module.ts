import { Module } from '@nestjs/common';
import {
  AuthClientService,
  BnsClientService,
  ArClientService,
  PosClientService,
} from './repository.service';

@Module({
  imports: [],
  exports: [],
  providers: [
    AuthClientService,
    BnsClientService,
    ArClientService,
    PosClientService,
  ],
  controllers: [],
})
export class RepositoryModule {}
