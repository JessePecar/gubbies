import { Category } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'category-item',
  imports: [MatIconModule],
  template: `
    <div class="grid grid-cols-4 p-2">
      <div class="flex flex-col justify-center h-full space-2">
        <p>
          <strong>({{ category().code }}) </strong>
          <span>{{ category().name }} </span>
        </p>
      </div>
      <div class="flex justify-around items-center h-full">
        <div class="flex flex-col items-center">
          <small class="mb-2">Can Promote</small>
          <span
            [class]="
              category().canPromote
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                category().canPromote ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
        <div class="flex flex-col items-center">
          <small class="mb-2">Can Transfer</small>
          <span
            [class]="
              category().canTransfer
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                category().canTransfer ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <small class="mb-2">Subcategories</small>
        @if (category().subcategories.length) {
          <p>{{ category().subcategories.length }}</p>
        } @else {
          <p>0</p>
        }
      </div>
      <div>
        <!-- Add the context menu for editing (we will need to add a special process for delete, so we won't allow delete for now) -->
      </div>
    </div>
  `,
  styles: ``,
})
export class CategoryItemComponent {
  category = input.required<Category>();
}
