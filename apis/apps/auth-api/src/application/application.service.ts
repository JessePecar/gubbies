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
          equals: id,
        },
      },
    });
  }

  async updateUsersApplication(id: number, userId: number) {
    await this.repository.user.update({
      where: {
        id: userId,
      },
      data: {
        applicationId: id,
      },
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
