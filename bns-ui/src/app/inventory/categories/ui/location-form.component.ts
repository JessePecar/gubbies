import { TextInputComponent } from '@/components';
import { FamilyStore } from '@/inventory/categories/store';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DropdownComponent,
  DropdownOption,
} from '@/components/inputs/dropdown.component';
import { ShelfSide } from '@/inventory/categories/interfaces';

@Component({
  selector: 'location-form',
  imports: [TextInputComponent, ReactiveFormsModule, DropdownComponent],
  template: `<div [formGroup]="familyStore.form">
    <form formGroupName="location" class="mb-4">
      <p class="text-lg mb-1">Shelf Location</p>
      <div class="grid grid-cols-4 gap-2">
        <div>
          <app-text-input
            [inputProps]="{ required: true }"
            formControlName="aisle"
            label="Aisle" />
        </div>
        <div>
          <app-dropdown
            [isRequired]="true"
            [options]="sideOptions"
            formControlName="side"
            label="Side" />
        </div>
        <div>
          <app-text-input
            [inputProps]="{ required: true }"
            formControlName="section"
            label="Section" />
        </div>
      </div>
    </form>
  </div>`,
  styles: ``,
})
export class LocationFormComponent {
  familyStore = inject(FamilyStore);

  sideOptions: DropdownOption[] = [
    { id: ShelfSide.LEFT, name: 'Left' },
    { id: ShelfSide.RIGHT, name: 'Right' },
  ];
}
