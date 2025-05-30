import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as BnsClient } from '@bns/bns-db-client-types';
import { PrismaClient as AuthClient } from '@auth/auth-db-client-types';
import { PrismaClient as ArClient } from '@ar/ar-db-client-types';
import { PrismaClient as PosClient } from '@pos/pos-db-client-types';

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
