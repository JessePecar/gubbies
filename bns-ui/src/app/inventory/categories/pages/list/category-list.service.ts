import {
  Category,
  Family,
  Subcategory,
} from '@/inventory/categories/interfaces';
import {
  AllSubcategoriesQuery,
  CategoriesQuery,
} from '@/inventory/categories/requests';
import { AllFamiliesQuery } from '@/inventory/categories/requests/all-families.query';
import { inject, Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryListService {
  categoriesQuery = inject(CategoriesQuery);
  allSubcategoriesQuery = inject(AllSubcategoriesQuery);
  familiesQuery = inject(AllFamiliesQuery);

  categories = signal<Category[]>([]);
  subcategories = signal<Subcategory[]>([]);
  families = signal<Family[]>([]);

  isLoading = signal<boolean>(true);

  loadCategories() {
    this.isLoading.set(true);

    this.categoriesQuery
      .watch()
      .valueChanges.subscribe(({ data: { categories }, loading }) => {
        this.isLoading.set(loading);
        this.categories.set(categories);
      });
  }

  loadFamilies() {
    this.isLoading.set(true);

    this.familiesQuery.fetch().subscribe(({ data: { families }, loading }) => {
      this.isLoading.set(loading);
      this.families.set(families);
    });
  }

  loadSubcategories() {
    this.isLoading.set(true);

    this.allSubcategoriesQuery
      .fetch()
      .subscribe(({ data: { subcategories }, loading }) => {
        this.isLoading.set(loading);
        this.subcategories.set(subcategories);
      });
  }
}
