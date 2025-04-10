import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/common/repository';
import { ReadRequest } from 'src/graphql.schema';

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

  async getItems() {
    return await this.repository.items.findMany({
      include: {
        ...this.defaultInclude,
      },
    });
  }

  async getItemsFromRequest(request: ReadRequest) {
    let filterObject = {};

    request.filters?.forEach((filter) => {
      if (filter.field && filter.field !== null) {
        filterObject[filter.field] = {
          equals: filter.value,
        };
      }
    });

    return await this.repository.items.findMany({
      include: {
        ...this.defaultInclude,
      },
      where: {
        AND: filterObject,
      },
      skip: request.offset ?? 0, // If no offset given, start at 0
      take: request.limit ?? 25, // If no limit given, only grab 25 records
    });
  }

  async getItemById(id: number) {
    return await this.repository.items.findFirst({
      include: {
        ...this.defaultInclude,
      },
      where: {
        id: {
          equals: id,
        },
      },
    });
  }
}
