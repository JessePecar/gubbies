import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@core/bns-db-client-types';

// The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database.
@Injectable()
export class RepositoryService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
