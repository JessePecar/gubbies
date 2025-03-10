import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';

@Injectable()
export class ItemsService {
  constructor(private repository: RepositoryService) {}

  async getItems() {
    return await this.repository.items.findMany({
      include: {
        category: {
          select: {
            code: true,
            name: true,
          },
        },
      },
      where: {
        AND: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            retirementStatus: {
              equals: 0,
            },
          },
        ],
      },
    });
  }

  async getItemById(id: number) {
    return await this.repository.items.findFirst({
      include: {
        category: {
          select: {
            code: true,
            name: true,
          },
        },
      },
      where: {
        id: {
          equals: id,
        },
      },
    });
  }
}
