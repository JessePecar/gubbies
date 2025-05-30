import { Module } from '@nestjs/common';
import {
  AuthClientService,
  BnsClientService,
  ArClientService,
  PosClientService,
} from './repository.service';

@Module({
  imports: [],
  exports: [BnsClientService],
  providers: [BnsClientService],
})
export class BnsRepositoryModule {}

@Module({
  imports: [],
  exports: [AuthClientService],
  providers: [AuthClientService],
})
export class AuthRepositoryModule {}

@Module({
  imports: [],
  exports: [ArClientService],
  providers: [ArClientService],
})
export class ArRepositoryModule {}

@Module({
  imports: [],
  exports: [PosClientService],
  providers: [PosClientService],
})
export class PosRepositoryModule {}
