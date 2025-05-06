import { Subcategory } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';

@Component({
  selector: 'subcategory-item',
  imports: [],
  template: ` <p>subcategory-item works!</p> `,
  styles: ``,
})
export class SubcategoryItemComponent {
  subcategory = input.required<Subcategory>();
}
