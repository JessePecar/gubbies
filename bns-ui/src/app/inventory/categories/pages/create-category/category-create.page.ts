import { CategoryStore } from '@/inventory/categories/store';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@/components/inputs/text-input.component';
import { SwitchInputComponent } from '@/components/inputs/switch-input.component';
import { ButtonComponent } from '../../../../components/buttons/button.component';
import { Router } from '@angular/router';
import { CategoryCreateService } from '@/inventory/categories/pages/create-category/category-create.service';

@Component({
  selector: 'app-category-create',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    SwitchInputComponent,
    ButtonComponent,
  ],
  template: `
    <div class="w-full h-full flex items-center justify-center">
      @if (categoryStore.form; as form) {
        <form class="w-1/2" [formGroup]="form">
          <h1 class="text-xl"><strong>Create Category</strong></h1>
          <div class="grid grid-cols-2 gap-4 pt-4">
            <!-- Category code -->
            <div>
              <app-text-input formControlName="code" label="Category Code" />
            </div>
            <!-- Category name -->
            <div>
              <app-text-input formControlName="name" label="Category Name" />
            </div>
            <!-- Can Promote -->
            <div class="flex items-end">
              <app-switch-input
                formControlName="canPromote"
                label="Can Create Category Promotion" />
              <app-switch-input
                title="Will default subcategory and families ability to transfer to the category when setting the category"
                formControlName="canTransfer"
                label="Can transfer items in the category" />
            </div>
          </div>

          <div class="w-full flex justify-end space-x-4 pt-4">
            <app-button
              text="Cancel"
              buttonType="text"
              (handleClick)="onCancel()" />
            <app-button
              [disabled]="!categoryStore.form.valid"
              text="Submit"
              buttonType="raised"
              (handleClick)="onSubmit()" />
          </div>
        </form>
      }
    </div>
  `,
  styles: ``,
})
export class CategoryCreatePage {
  categoryStore = inject(CategoryStore);
  categoryCreateService = inject(CategoryCreateService);

  router = inject(Router);

  onSubmit() {
    this.categoryCreateService.onSubmit();
  }

  onCancel() {
    this.router.navigate(['inventory', 'categories', 'list']);
  }
}
