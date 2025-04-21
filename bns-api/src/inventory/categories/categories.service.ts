import { Injectable, NotImplementedException } from '@nestjs/common';
import { RepositoryService } from 'src/common/repository';
import {
  CreateCategoryInput,
  CreateFamilyInput,
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
      create: upsertCategory,
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
      create: upsertSubcategory,
      update: {
        name: upsertSubcategory.name,
        categoryCode: upsertSubcategory.categoryCode, // Not sure if this is something I want to be able to do
      },
    });
  }

  async upsertFamily(upsertFamily: CreateFamilyInput) {
    return this.repository.family.upsert({
      where: {
        code: upsertFamily.code,
      },
      create: upsertFamily,
      update: {
        name: upsertFamily.name,
        subcategoryCode: upsertFamily.subcategoryCode, // Not sure if this is something I want to be able to do
      },
    });
  }
}
