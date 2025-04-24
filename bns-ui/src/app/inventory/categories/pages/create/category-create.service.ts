import { CategoriesQuery } from '@/inventory/categories/requests';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryCreateService {
  categoriesQuery = inject(CategoriesQuery);

  categories = signal<any[]>([]);

  getCategories() {
    this.categoriesQuery.fetch().subscribe(({ data: { categories } }) => {
      this.categories.set(categories);
    });
  }

  constructor() {
    this.getCategories();
  }
}
