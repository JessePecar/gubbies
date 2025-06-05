import {
  TextInputComponent,
  SwitchInputComponent,
  DropdownComponent,
  DropdownOption,
} from '@/core/components';
import { ButtonComponent } from '@/core/components/buttons';
import { CreateFamilyService } from '@/inventory/categories/pages/create-family/create-family.service';
import { FamilyStore } from '@/inventory/categories/store';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationFormComponent } from '@/inventory/categories/ui';

@Component({
  selector: 'app-create-family',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    SwitchInputComponent,
    ButtonComponent,
    DropdownComponent,
    LocationFormComponent,
  ],
  template: ` <div class="w-full h-full flex items-center justify-center">
    @if (familyCreateService.subcategories(); as categories) {
      @if (familyStore.form; as form) {
        <form class="w-1/2" [formGroup]="form">
          <h1 class="text-xl"><strong>Create Family</strong></h1>
          <div class="grid grid-cols-3 gap-4 pt-4">
            <!-- Family code -->
            <div>
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="code"
                label="Family Code" />
            </div>
            <!-- Family name -->
            <div>
              <app-text-input
                [inputProps]="{ required: true }"
                formControlName="name"
                label="Family Name" />
            </div>
            <!-- Parent subcategory -->
            <div>
              <!-- <p></p> -->
              <app-dropdown
                label="Subcategory"
                formControlName="subcategoryCode"
                [isRequired]="true"
                [options]="subcategoryOptions()">
              </app-dropdown>
            </div>
            <!-- Can Promote -->
            <div class="flex items-end col-span-3 space-x-4">
              <app-switch-input
                formControlName="canPromote"
                label="Can create family promotions" />

              <app-switch-input
                formControlName="canTransfer"
                label="Can transfer items assigned to family" />

              <app-switch-input
                formControlName="canPriceChange"
                label="Can override item's prices" />
            </div>
          </div>

          <hr class="border-primary-dark my-4" />
          <location-form />
          <div class="w-full flex justify-end space-x-4 pt-4">
            <app-button
              text="Cancel"
              buttonType="text"
              (handleClick)="onCancel()" />
            <app-button
              [disabled]="!familyStore.form.valid"
              text="Submit"
              buttonType="raised"
              (handleClick)="onSubmit()" />
          </div>
        </form>
      }
    }
  </div>`,
  styles: ``,
})
export class CreateFamilyPage {
  familyStore = inject(FamilyStore);
  router = inject(Router);
  familyCreateService = inject(CreateFamilyService);

  subcategoryOptions = signal<DropdownOption[]>([]);

  constructor() {
    effect(() => {
      const categories = this.familyCreateService.subcategories();
      untracked(() => {
        const newOpts = categories.map(cat => {
          return {
            id: cat.code,
            name: cat.name,
          } as DropdownOption;
        });
        this.subcategoryOptions.set(newOpts);
      });
    });
  }

  onSubmit() {
    this.familyCreateService.onSubmit();
  }

  onCancel() {
    this.router.navigate(['inventory', 'categories', 'list']);
  }
}
