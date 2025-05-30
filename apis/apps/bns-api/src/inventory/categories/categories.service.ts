import { Injectable } from '@nestjs/common';
import { BnsClientService } from '@core/repository';
import {
  CreateCategoryInput,
  CreateFamilyInput,
  CreateShelfLocation,
  CreateSubcategoryInput,
} from '@bns/graphql.schema';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: BnsClientService) {}

  private readonly familyIncludes = {
    location: true,
  };

  private readonly subcategoryIncludes = {
    families: {
      include: this.familyIncludes,
    },
  };

  private readonly defaultIncludes = {
    subcategories: {
      include: this.subcategoryIncludes,
    },
  };

  // Get all the categories in the list, do not include children, just the count
  async getCategories() {
    return await this.repository.categories.findMany({
      include: {
        subcategories: true,
      },
    });
  }

  async getCategoryByCode(code: string) {
    return await this.repository.categories.findFirst({
      where: {
        code: {
          equals: code,
        },
      },
      include: this.defaultIncludes,
    });
  }

  async getAllSubcategories() {
    return await this.repository.subcategory.findMany({
      include: {
        families: true,
        category: true,
      },
    });
  }

  async getSubcategories(categoryCode: string) {
    return await this.repository.subcategory.findMany({
      where: {
        categoryCode: {
          equals: categoryCode,
        },
      },
    });
  }

  async getSubcategoryByCode(code: string) {
    return await this.repository.subcategory.findFirst({
      where: {
        code: {
          equals: code,
        },
      },
      include: this.subcategoryIncludes,
    });
  }

  async getAllFamilies() {
    return await this.repository.family.findMany({
      include: {
        location: true,
        subcategory: true,
      },
    });
  }

  async getFamilies(subcategoryCode: string) {
    return await this.repository.family.findMany({
      where: {
        subcategoryCode: {
          equals: subcategoryCode,
        },
      },
    });
  }

  async getFamilyByCode(code: string) {
    return await this.repository.family.findFirst({
      where: {
        code: {
          equals: code,
        },
      },
      include: this.familyIncludes,
    });
  }

  async upsertCategory(upsertCategory: CreateCategoryInput) {
    const newCategory = await this.repository.categories.upsert({
      where: {
        code: upsertCategory.code,
      },
      create: {
        ...upsertCategory,
        canPromote: upsertCategory.canPromote ?? undefined,
        canTransfer: upsertCategory.canTransfer ?? undefined,
      },
      update: {
        name: upsertCategory.name,
      },
    });

    return newCategory;
  }

  async upsertSubcategory(upsertSubcategory: CreateSubcategoryInput) {
    return await this.repository.subcategory.upsert({
      where: {
        code: upsertSubcategory.code,
      },
      create: {
        ...upsertSubcategory,
        canPromote: upsertSubcategory.canPromote ?? undefined,
        canTransfer: upsertSubcategory.canTransfer ?? undefined,
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

    return await this.repository.shelfLocation.update({
      where: {
        id: upsertLocation.id,
      },
      data: {
        aisle: upsertLocation.aisle,
        section: upsertLocation.section ?? '',
        side: upsertLocation.side,
      },
    });
  }

  async upsertFamily(upsertFamily: CreateFamilyInput) {
    let location;
    if (!!upsertFamily.location) {
      location = await this.upsertLocation(upsertFamily.location);
    }

    return await this.repository.family.upsert({
      where: {
        code: upsertFamily.code,
      },
      create: {
        code: upsertFamily.code,
        canPromote: upsertFamily.canPromote ?? false,
        canTransfer: upsertFamily.canTransfer ?? false,
        canPriceChange: upsertFamily.canPriceChange ?? false,
        locationId: location.id, // If creating, we will have had a new location object created
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
