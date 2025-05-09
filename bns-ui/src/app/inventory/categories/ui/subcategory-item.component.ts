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
          <strong>{{ subcategory().code }}</strong>
        </p>
        <p>
          <small>{{ subcategory().name }} </small>
        </p>
      </div>
      <div class="flex justify-around items-center h-full">
        <div class="flex flex-col items-center">
          <p>Can Promote</p>
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
          <p>Can Transfer</p>
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
        <p>Families</p>
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
