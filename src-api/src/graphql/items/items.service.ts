import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';

@Injectable()
export class ItemsService {
  constructor(private repository: RepositoryService) {}

  // Based on structure, this will pull the code/name from each cat, subcat and fam
  private readonly subCatFamSelect = {
    code: true,
    name: true,
  };

  // The default include for items that will include the navigation properties
  private readonly defaultInclude = {
    category: {
      include: {
        subCategories: {
          include: {
            families: {
              select: this.subCatFamSelect,
            },
          },
          select: this.subCatFamSelect,
        },
      },
      select: this.subCatFamSelect,
    },
  };

  // TODO: Have the UI determine the filter it wants
  async getItems() {
    return await this.repository.items.findMany({
      include: {
        ...this.defaultInclude,
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
