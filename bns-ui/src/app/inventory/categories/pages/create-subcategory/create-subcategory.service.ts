import { GlobalAlertService } from '@/components/alert';
import { Category } from '@/inventory/categories/interfaces';
import { CategoryListService } from '@/inventory/categories/pages/list';
import {
  CategoriesQuery,
  CreateSubcategoryMutation,
} from '@/inventory/categories/requests';
import { SubcategoryStore } from '@/inventory/categories/store/subcategory.store';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateSubcategoryService {
  categoriesQuery = inject(CategoriesQuery);
  createSubcategoryMutation = inject(CreateSubcategoryMutation);
  categoryStore = inject(SubcategoryStore);
  alertService = inject(GlobalAlertService);
  router = inject(Router);

  categoryListService = inject(CategoryListService);

  categories = signal<Category[]>([]);

  constructor() {
    this.categoriesQuery.fetch().subscribe(({ data: { categories } }) => {
      this.categories.set(categories);
    });
  }

  onSubmit() {
    const formValue = this.categoryStore.form.value;

    if (this.categoryStore.form.valid) {
      this.categoryStore.onSubmit((isCodeValid: boolean) => {
        if (isCodeValid) {
          this.createSubcategoryMutation
            .mutate(
              {
                createSubcategoryInput: formValue,
              },
              {
                errorPolicy: 'all',
                fetchPolicy: 'network-only',
              }
            )
            .subscribe(({ data, errors }) => {
              if (data && !errors) {
                this.alertService.addAlert(
                  'success',
                  'Successfully created a new Category',
                  2000
                );

                this.categoryListService.subcategories.update(cat => [
                  ...cat,
                  data.upsertSubcategory,
                ]);

                this.router.navigate(['inventory', 'categories', 'list']);
              } else {
                errors?.forEach(err => {
                  this.alertService.addAlert('error', err.message, 2000);
                });
              }
            });
        } else {
          this.alertService.addAlert(
            'error',
            'Category Code already exists',
            2000
          );
        }
      });
    }
  }
}
