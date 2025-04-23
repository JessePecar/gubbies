import { Injectable, NotImplementedException } from '@nestjs/common';
import { RepositoryService } from 'src/common/repository';
import {
  CreateCategoryInput,
  CreateFamilyInput,
  CreateShelfLocation,
  CreateSubcategoryInput,
} from 'src/graphql.schema';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: RepositoryService) {}

  private readonly defaultIncludes = {
    subcategories: {
      include: {
        families: true,
      },
    },
  };

  async getCategories() {
    return this.repository.categories.findMany({
      include: this.defaultIncludes,
    });
  }

  async getCategoryByCode(code: string) {
    return this.repository.categories.findFirst({
      where: {
        code: {
          equals: code,
        },
      },
      include: this.defaultIncludes,
    });
  }

  async getSubcategories(categoryCode: string) {
    return this.repository.subcategory.findMany({
      where: {
        categoryCode: {
          equals: categoryCode,
        },
      },
    });
  }

  async getFamilies(subcategoryCode: string) {
    return this.repository.family.findMany({
      where: {
        subcategoryCode: {
          equals: subcategoryCode,
        },
      },
    });
  }

  async upsertCategory(upsertCategory: CreateCategoryInput) {
    return this.repository.categories.upsert({
      where: {
        code: upsertCategory.code,
      },
      create: {
        ...upsertCategory,
        canPromote: upsertCategory.canPromote ?? undefined,
      },
      update: {
        name: upsertCategory.name,
      },
    });
  }

  async upsertSubcategory(upsertSubcategory: CreateSubcategoryInput) {
    return this.repository.subcategory.upsert({
      where: {
        code: upsertSubcategory.code,
      },
      create: {
        ...upsertSubcategory,
        canPromote: upsertSubcategory.canPromote ?? undefined,
      },
      update: {
        name: upsertSubcategory.name,
        categoryCode: upsertSubcategory.categoryCode, // Not sure if this is something I want to be able to do
      },
    });
  }

  async upsertLocation(upsertLocation: CreateShelfLocation) {
    if (upsertLocation.id === 0) {
      return await this.repository.shelfLocation.create({
        data: {
          aisle: upsertLocation.aisle,
          section: upsertLocation.section ?? '',
          side: upsertLocation.side,
        },
      });
    }
  }

  async upsertFamily(upsertFamily: CreateFamilyInput) {
    if (upsertFamily.location) {
      await this.upsertLocation(upsertFamily.location);
    }

    return await this.repository.family.upsert({
      where: {
        code: upsertFamily.code,
      },
      create: {
        code: upsertFamily.code,
        canPromote: upsertFamily.canPromote ?? false,
        name: upsertFamily.name,
        subcategoryCode: upsertFamily.subcategoryCode,
      },
      update: {
        name: upsertFamily.name,
        subcategoryCode: upsertFamily.subcategoryCode, // Not sure if this is something I want to be able to do
      },
    });
  }
}
