import { Category } from '@/inventory/categories/interfaces';
import { CategoriesQuery } from '@/inventory/categories/requests';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryListService {
  categoriesQuery = inject(CategoriesQuery);

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);

  loadCategories() {
    this.isLoading.set(true);
    this.categoriesQuery
      .fetch()
      .subscribe(({ data: { categories }, loading }) => {
        this.isLoading.set(loading);
        this.categories.set(categories);
      });
  }
}
