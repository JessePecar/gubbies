import { Family } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'family-item',
  imports: [MatIconModule],
  template: `
    <div class="grid grid-cols-4 p-2">
      <div class="flex flex-col justify-center h-full space-2">
        <p>
          <strong>({{ family().code }}) </strong>
          <span>{{ family().name }} </span>
        </p>
        <small
          >Subcategory:
          <span class="italic">{{ family().subcategory.name }}</span></small
        >
      </div>
      <div class="col-span-2 flex justify-around items-center h-full">
        <div class="flex flex-col items-center">
          <small class="mb-2">Can Promote</small>
          <span
            [class]="
              family().canPromote
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                family().canPromote ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
        <div class="flex flex-col items-center">
          <small class="mb-2">Can Transfer</small>
          <span
            [class]="
              family().canTransfer
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                family().canTransfer ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
        <div class="flex flex-col items-center">
          <small class="mb-2">Can Change Price</small>
          <span
            [class]="
              family().canPriceChange
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                family().canPriceChange ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <small class="mb-3">Aisle/Side/Section</small>
        @if (family().location; as location) {
          <p class="text-sm">
            {{ location.aisle }} / {{ location.side }} / {{ location.section }}
          </p>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class FamilyItemComponent {
  family = input.required<Family>();
}
