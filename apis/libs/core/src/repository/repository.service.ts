import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as BnsClient } from '@core/bns-db-client-types';
import { PrismaClient as AuthClient } from '@core/auth-db-client-types';
import { PrismaClient as ArClient } from '@core/ar-db-client-types';
import { PrismaClient as PosClient } from '@core/pos-db-client-types';

export type BnsClientTransaction = Omit<
  BnsClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export type AuthClientTransaction = Omit<
  AuthClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export type ArClientTransaction = Omit<
  ArClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export type PosClientTransaction = Omit<
  PosClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

// The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database.
@Injectable()
export class BnsClientService extends BnsClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

@Injectable()
export class AuthClientService extends AuthClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

@Injectable()
export class ArClientService extends ArClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

@Injectable()
export class PosClientService extends PosClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
