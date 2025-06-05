import { applicationSeed } from '@auth/seed';
import { AuthClientService } from '@core/repository';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class ApplicationService implements OnApplicationBootstrap {
  constructor(private readonly repository: AuthClientService) {}

  async getApplication(id: number) {
    return await this.repository.application.findFirst({
      where: {
        id: {
          equals: +id,
        },
      },
    });
  }

  async updateUsersApplication(id: number, userId: number) {
    this.repository.$transaction(async (transaction) => {
      await transaction.user.update({
        where: {
          id: userId,
        },
        data: {
          applicationId: id,
        },
      });

      await transaction.userClaim.update({
        where: {
          code_userId: {
            code: 'APPLICATION_ID',
            userId: userId,
          },
        },
        data: {
          value: `${id}`,
        },
      });
    });
  }

  async onApplicationBootstrap() {
    const upsertTask = applicationSeed.map((app) => {
      return this.repository.application.upsert({
        where: {
          id: app.id,
        },
        create: {
          accessCode: app.accessCode,
          domain: app.domain,
          name: app.name,
        },
        update: {
          accessCode: app.accessCode,
          domain: app.domain,
          name: app.name,
        },
      });
    });

    Promise.all(upsertTask);
  }
}
