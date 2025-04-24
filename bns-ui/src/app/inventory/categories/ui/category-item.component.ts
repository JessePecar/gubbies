import { Category } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-category-item',
  imports: [],
  template: `
    <div>
      <p>{{ category().name }}</p>
    </div>
  `,
  styles: ``,
})
export class CategoryItemComponent {
  category = input.required<Category>();
}
