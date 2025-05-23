import { GlobalAlertService } from '@/components/alert';
import { CategoryListService } from '@/inventory/categories/pages/list';
import { CategoriesQuery } from '@/inventory/categories/requests';
import { CreateCategoryMutation } from '@/inventory/categories/requests/create-category.mutation';
import { CategoryStore } from '@/inventory/categories/store';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryCreateService {
  categoriesQuery = inject(CategoriesQuery);
  createCategoryMutation = inject(CreateCategoryMutation);
  categoryStore = inject(CategoryStore);
  alertService = inject(GlobalAlertService);
  router = inject(Router);

  categoryListService = inject(CategoryListService);

  categories = signal<any[]>([]);

  getCategories() {
    this.categoriesQuery.fetch().subscribe(({ data: { categories } }) => {
      this.categories.set(categories);
    });
  }

  onSubmit() {
    const formValue = this.categoryStore.form.value;

    if (this.categoryStore.form.valid) {
      this.categoryStore.onSubmit((isCodeValid: boolean) => {
        if (isCodeValid) {
          this.createCategoryMutation
            .mutate(
              {
                createCategoryInput: formValue,
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

                this.categoryListService.categories.set([
                  ...this.categoryListService.categories(),
                  data.upsertCategory,
                ]);

                console.log(this.categoryListService.categories());

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

  constructor() {
    this.getCategories();
  }
}
