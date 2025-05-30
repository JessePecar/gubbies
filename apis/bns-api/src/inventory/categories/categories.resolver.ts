import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AppAuthGuard } from 'src/common/guards';
import {
  CreateCategoryInput,
  CreateFamilyInput,
  CreateSubcategoryInput,
} from 'src/graphql.schema';
import { CategoriesService } from 'src/inventory/categories/categories.service';

@Resolver('Categories')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AppAuthGuard)
  @Query('categories')
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @UseGuards(AppAuthGuard)
  @Query('category')
  async getCategoryByCode(@Args('code') code: string) {
    return await this.categoriesService.getCategoryByCode(code);
  }

  @UseGuards(AppAuthGuard)
  @Query('categorySubcategories')
  async getSubcategories(@Args('categoryCode') categoryCode: string) {
    return await this.categoriesService.getSubcategories(categoryCode);
  }

  @UseGuards(AppAuthGuard)
  @Query('subcategories')
  async getAllSubcategories() {
    return await this.categoriesService.getAllSubcategories();
  }

  @UseGuards(AppAuthGuard)
  @Query('subcategory')
  async getSubcategoryByCode(@Args('code') code: string) {
    return await this.categoriesService.getSubcategoryByCode(code);
  }

  @UseGuards(AppAuthGuard)
  @Query('families')
  async getAllFamilies() {
    return await this.categoriesService.getAllFamilies();
  }

  @UseGuards(AppAuthGuard)
  @Query('subcategoryFamilies')
  async getFamilies(@Args('subcategoryCode') subcategoryCode: string) {
    return await this.categoriesService.getFamilies(subcategoryCode);
  }

  @UseGuards(AppAuthGuard)
  @Query('family')
  async getFamilyByCode(@Args('code') code: string) {
    return await this.categoriesService.getFamilyByCode(code);
  }

  @UseGuards(AppAuthGuard)
  @Mutation('upsertCategory')
  async upsertCategory(
    @Args('createCategoryInput') upsertCategory: CreateCategoryInput,
  ) {
    return await this.categoriesService.upsertCategory(upsertCategory);
  }

  @UseGuards(AppAuthGuard)
  @Mutation('upsertSubcategory')
  async upsertSubcategory(
    @Args('createSubcategoryInput') upsertSubcategory: CreateSubcategoryInput,
  ) {
    return await this.categoriesService.upsertSubcategory(upsertSubcategory);
  }

  @UseGuards(AppAuthGuard)
  @Mutation('upsertFamily')
  async upsertFamily(
    @Args('createFamilyInput') upsertFamily: CreateFamilyInput,
  ) {
    return await this.categoriesService.upsertFamily(upsertFamily);
  }
}
