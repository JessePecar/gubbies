import { Category } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'category-item',
  imports: [MatIconModule],
  template: `
    <div class="grid grid-cols-5 p-2">
      <div class="flex flex-col justify-center h-full space-2">
        <p>{{ category().code }}</p>
        <p>{{ category().name }}</p>
      </div>
      <div class="flex flex-col items-center h-full">
        <p>Can Promote</p>
        <mat-icon
          class="text-primary-green"
          [fontIcon]="
            category().canPromote ? 'disabled_by_default' : 'priority'
          " />
      </div>
      <div class="flex flex-col items-center h-full">
        <p>Can Transfer</p>
        <mat-icon
          class="text-primary-green"
          [fontIcon]="
            category().canTransfer ? 'disabled_by_default' : 'priority'
          " />
      </div>
      <div>
        <p>Subcategories: {{ category().subcategoryCount }}</p>
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
