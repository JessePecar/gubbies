import { Component, effect, inject, signal, untracked } from '@angular/core';
import { ItemStore } from '@/inventory/items/store';
import { CardModule } from '@/components/card';
import { ButtonComponent } from '@/components/buttons';
import { Router } from '@angular/router';
import { FooterButtonsComponent } from '@/inventory/items/ui/footer-buttons.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DropdownComponent,
  DropdownOption,
  NumberInputComponent,
  SwitchInputComponent,
  TextInputComponent,
} from '@/components';
import {
  RetirementStatus,
  UnitOfMeasurementType,
} from '@/inventory/items/interfaces';
import {
  SubcategoriesQuery,
  CategoriesQuery,
  FamiliesQuery,
} from '@/inventory/categories/requests';

@Component({
  selector: 'app-item-information',
  imports: [
    CardModule,
    ButtonComponent,
    TextInputComponent,
    NumberInputComponent,
    SwitchInputComponent,
    FooterButtonsComponent,
    ReactiveFormsModule,
    DropdownComponent,
  ],
  template: `
    <card>
      <card-body>
        <form [formGroup]="itemStore.form">
          <div formGroupName="info" class="grid grid-cols-4 py-2 gap-2">
            <div class="col-span-4 flex justify-end">
              <app-switch-input label="Is Active" formControlName="isActive" />
            </div>
            <app-text-input label="Name" formControlName="name" />
            <app-number-input
              label="Quantity on Hand"
              formControlName="quantityOnHand" />
            <app-dropdown
              label="Retirement Status"
              [options]="retirementStatusOptions" />
            <app-dropdown label="Unit of Measurement" [options]="uomOptions" />

            <app-dropdown
              label="Category"
              [options]="categories()"
              formControlName="categoryCode"
              (handleUnfocus)="getSubcategories($event)" />
            @if (
              !!this.itemStore.form.get('info')?.get('categoryCode')?.value
            ) {
              <app-dropdown
                label="Subcategory"
                [options]="subcategories()"
                formControlName="subcategoryCode"
                (handleUnfocus)="getFamilies($event)" />
            }
            @if (
              !!this.itemStore.form.get('info')?.get('subcategoryCode')?.value
            ) {
              <app-dropdown
                label="Family"
                [options]="families()"
                formControlName="familyCode" />
            }
          </div>
        </form>
      </card-body>
      <card-footer>
        <footer-buttons [canSubmit]="itemStore.form.valid" nextStep="vendor" />
      </card-footer>
    </card>
  `,
  styles: ``,
})
export class ItemInformationComponent {
  itemStore = inject(ItemStore);
  router = inject(Router);
  getCategoriesQuery = inject(CategoriesQuery);
  getSubcategoriesQuery = inject(SubcategoriesQuery);
  getFamiliesQuery = inject(FamiliesQuery);

  categories = signal<DropdownOption[]>([]);
  subcategories = signal<DropdownOption[]>([]);
  families = signal<DropdownOption[]>([]);

  constructor() {
    this.getCategories();
  }

  getCategories() {
    this.getCategoriesQuery.fetch().subscribe(({ data: { categories } }) => {
      this.categories.set([
        { id: '', name: '---' },
        ...categories.map(cat => ({
          id: cat.code,
          name: cat.name,
        })),
      ]);
    });
  }

  getSubcategories(catCode: string | number | null) {
    if (!!!catCode) {
      this.subcategories.set([{ id: '', name: '---' }]);
      return;
    }

    this.getSubcategoriesQuery
      .fetch({
        categoryCode: catCode as string,
      })
      .subscribe(({ data: { categorySubcategories } }) => {
        this.subcategories.set([
          { id: '', name: '---' },
          ...categorySubcategories.map(cs => ({
            id: cs.code,
            name: cs.name,
          })),
        ]);
      });
  }

  getFamilies(subcatCode: string | number | null) {
    if (!!!subcatCode) {
      this.families.set([{ id: '', name: '---' }]);
      return;
    }

    this.getFamiliesQuery
      .fetch({
        subcategoryCode: subcatCode as string,
      })
      .subscribe(({ data: { subcategoryFamilies } }) => {
        this.families.set([
          { id: '', name: '---' },
          ...subcategoryFamilies.map(sf => ({
            id: sf.code,
            name: sf.name,
          })),
        ]);
      });
  }

  uomOptions = [
    {
      id: UnitOfMeasurementType.EA,
      name: 'Each',
    },
    {
      id: UnitOfMeasurementType.LBS,
      name: 'Pounds',
    },
    {
      id: UnitOfMeasurementType.OUNCES,
      name: 'Ounces',
    },
  ];

  retirementStatusOptions = [
    { id: RetirementStatus.ACTIVE, name: 'Active' },
    { id: RetirementStatus.RETIRING, name: 'Retiring' },
    { id: RetirementStatus.RETIRED, name: 'Retired' },
  ];
}
