import { GlobalAlertService } from '@/components/alert';
import { ShelfSide, Subcategory } from '@/inventory/categories/interfaces';
import { CategoryListService } from '@/inventory/categories/pages/list';
import {
  AllSubcategoriesQuery,
  CreateFamilyMutation,
} from '@/inventory/categories/requests';
import { FamilyStore } from '@/inventory/categories/store';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateFamilyService {
  subcategoriesQuery = inject(AllSubcategoriesQuery);
  createFamilyMutation = inject(CreateFamilyMutation);
  familyStore = inject(FamilyStore);
  alertService = inject(GlobalAlertService);
  router = inject(Router);

  categoryListService = inject(CategoryListService);

  subcategories = signal<Subcategory[]>([]);

  constructor() {
    this.subcategoriesQuery.fetch().subscribe(({ data: { subcategories } }) => {
      this.subcategories.set(subcategories);
    });
  }

  onSubmit() {
    const formValue = this.familyStore.form.value;

    if (this.familyStore.form.valid) {
      this.familyStore.onSubmit((isCodeValid: boolean) => {
        if (isCodeValid) {
          this.createFamilyMutation
            .mutate(
              {
                createFamilyInput: {
                  ...formValue,
                  location: {
                    id: 0,
                    aisle: +formValue.location.aisle,
                    side:
                      formValue.location.side === ShelfSide.RIGHT
                        ? 'RIGHT'
                        : 'LEFT',
                    section: formValue.location.section,
                  },
                },
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

                this.categoryListService.families.update(fam => [
                  ...fam,
                  data.upsertFamily,
                ]);

                this.router.navigate([
                  'inventory',
                  'categories',
                  'family-list',
                ]);
              } else {
                errors?.forEach(err => {
                  this.alertService.addAlert('error', err.message, 2000);
                });
              }
            });
        } else {
          this.alertService.addAlert(
            'error',
            'Family Code already exists',
            2000
          );
        }
      });
    }
  }
}
