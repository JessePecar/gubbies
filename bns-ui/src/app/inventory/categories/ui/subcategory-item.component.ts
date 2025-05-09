import { Subcategory } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'subcategory-item',
  imports: [MatIconModule],
  template: `
    <div class="grid grid-cols-4 p-2">
      <div class="flex flex-col justify-center h-full space-2">
        <p>
          <strong>({{ subcategory().code }}) </strong>
          <span>{{ subcategory().name }} </span>
        </p>
        <small
          >Category:
          <span class="italic">{{ subcategory().category.name }}</span></small
        >
      </div>
      <div class="flex justify-around items-center h-full">
        <div class="flex flex-col items-center">
          <small class="mb-2">Can Promote</small>
          <span
            [class]="
              subcategory().canPromote
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                subcategory().canPromote ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
        <div class="flex flex-col items-center">
          <small class="mb-2">Can Transfer</small>
          <span
            [class]="
              subcategory().canTransfer
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                subcategory().canTransfer ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <small class="mb-2">Families</small>
        @if (subcategory().families.length) {
          <p>{{ subcategory().families.length }}</p>
        } @else {
          <p>0</p>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class SubcategoryItemComponent {
  subcategory = input.required<Subcategory>();
}
