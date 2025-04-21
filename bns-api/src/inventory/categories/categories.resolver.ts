import { Args, Resolver } from '@nestjs/graphql';
import { CreateCategoryInput, CreateFamilyInput, CreateSubcategoryInput } from 'src/graphql.schema';
import { CategoriesService } from 'src/inventory/categories/categories.service';

@Resolver('Categories')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  async getCategories() {
    return this.categoriesService.getCategories();
  }

  async getCategoryByCode(@Args('code') code: string) {
    return this.categoriesService.getCategoryByCode(code);
  }

  async getSubcategories(@Args('categoryCode') categoryCode: string) {
    return this.categoriesService.getSubcategories(categoryCode);
  }

  async getFamilies(@Args('subcategoryCode') subcategoryCode: string) {
    return this.categoriesService.getFamilies(subcategoryCode);
  }

  async upsertCategory(@Args('upsertCategory') upsertCategory: CreateCategoryInput) {
    return this.categoriesService.upsertCategory(upsertCategory);
  }

  async upsertSubcategory(@Args('upsertSubcategory') upsertSubcategory: CreateSubcategoryInput) {
    return this.categoriesService.upsertSubcategory(upsertSubcategory);
  }

  async upsertFamily(@Args('upsertFamily') upsertFamily: CreateFamilyInput) {
    return this.categoriesService.upsertFamily(upsertFamily);
  }
}
