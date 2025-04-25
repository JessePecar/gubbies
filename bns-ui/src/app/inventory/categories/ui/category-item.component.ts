import { Category } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';

@Component({
  selector: 'category-item',
  imports: [],
  template: `
    <div class="grid grid-cols-4 p-2">
      <div class="flex items-center h-full">
        <p>{{ category().code }}</p>
      </div>
      <div class="flex items-center h-full">
        <p>{{ category().name }}</p>
      </div>
      <div>
        @if (category().canPromote) {
          <p class="rounded-full bg-primary-green text-white px-4 py-2">
            Can Promote
          </p>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CategoryItemComponent {
  category = input.required<Category>();
}
