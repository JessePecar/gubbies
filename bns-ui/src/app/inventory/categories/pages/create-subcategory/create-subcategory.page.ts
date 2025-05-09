import { TextInputComponent, SwitchInputComponent } from '@/components';
import { ButtonComponent } from '@/components/buttons';
import { CreateSubcategoryService } from '@/inventory/categories/pages/create-subcategory/create-subcategory.service';
import { SubcategoryStore } from '@/inventory/categories/store/subcategory.store';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DropdownComponent,
  DropdownOption,
} from '@/components/inputs/dropdown.component';

@Component({
  selector: 'app-create-subcategory',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    SwitchInputComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  template: `
    <div class="w-full h-full flex items-center justify-center">
      @if (subcategoryCreateService.categories(); as categories) {
        @if (subcategoryStore.form; as form) {
          <form class="w-1/2" [formGroup]="form">
            <h1 class="text-xl"><strong>Create Subcategory</strong></h1>
            <div class="grid grid-cols-3 gap-4 pt-4">
              <!-- Subcategory code -->
              <div>
                <app-text-input
                  formControlName="code"
                  label="Subcategory Code" />
              </div>
              <!-- Subcategory name -->
              <div>
                <app-text-input
                  formControlName="name"
                  label="Subcategory Name" />
              </div>
              <!-- Parent category -->
              <div>
                <!-- <p></p> -->
                <app-dropdown
                  [isRequired]="true"
                  label="Category"
                  formControlName="categoryCode"
                  [options]="categoryOptions()">
                </app-dropdown>
              </div>
              <!-- Can Promote -->
              <div class="flex items-end col-span-3 space-x-6">
                <app-switch-input
                  formControlName="canPromote"
                  label="Can create subcategory level promotion" />

                <app-switch-input
                  title="Will default subcategory and families ability to transfer to the category when setting the category"
                  formControlName="canTransfer"
                  label="Can transfer items assigned to subcategory" />
              </div>
            </div>

            <div class="w-full flex justify-end space-x-4 pt-4">
              <app-button
                text="Cancel"
                buttonType="text"
                (handleClick)="onCancel()" />
              <app-button
                [disabled]="!subcategoryStore.form.valid"
                text="Submit"
                buttonType="raised"
                (handleClick)="onSubmit()" />
            </div>
          </form>
        }
      }
    </div>
  `,
  styles: ``,
})
export class CreateSubcategoryPage {
  subcategoryStore = inject(SubcategoryStore);
  router = inject(Router);
  subcategoryCreateService = inject(CreateSubcategoryService);

  categoryOptions = signal<DropdownOption[]>([]);

  constructor() {
    effect(() => {
      const categories = this.subcategoryCreateService.categories();
      untracked(() => {
        const newOpts = categories.map(cat => {
          return {
            id: cat.code,
            name: cat.name,
          } as DropdownOption;
        });
        this.categoryOptions.set(newOpts);
      });
    });
  }

  onSubmit() {
    this.subcategoryCreateService.onSubmit();
  }

  onCancel() {
    this.router.navigate(['inventory', 'categories', 'list']);
  }
}
