import {
  Category,
  Family,
  Subcategory,
} from '@/inventory/categories/interfaces';
import {
  AllSubcategoriesQuery,
  CategoriesQuery,
} from '@/inventory/categories/requests';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryListService {
  categoriesQuery = inject(CategoriesQuery);
  allSubcategoriesQuery = inject(AllSubcategoriesQuery);
  familiesQuery = inject(CategoriesQuery);

  categories = signal<Category[]>([]);
  subcategories = signal<Subcategory[]>([]);
  families = signal<Family[]>([]);

  isLoading = signal<boolean>(true);

  loadCategories() {
    this.isLoading.set(true);
    this.categoriesQuery
      .fetch()
      .subscribe(({ data: { categories }, loading }) => {
        this.isLoading.set(loading);
        this.categories.set(categories);
      });

    this.allSubcategoriesQuery
      .fetch()
      .subscribe(({ data: { subcategories }, loading }) => {
        this.isLoading.set(loading);
        this.subcategories.set(subcategories);
      });

    this.categoriesQuery
      .fetch()
      .subscribe(({ data: { categories }, loading }) => {
        this.isLoading.set(loading);
        this.categories.set(categories);
      });
  }
}
