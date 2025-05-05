import { Component } from '@angular/core';
import { TabContainerComponent, TabComponent } from '@/components/tab';

@Component({
  selector: 'app-category-list',
  imports: [TabContainerComponent, TabComponent],
  template: `
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-3/4">
        <app-tab-container [tabs]="tabs" />
      </div>
    </div>
  `,
  styles: ``,
})
export class CategoryListPage {
  tabs = [
    { path: 'category-list', title: 'Categories' },
    { path: 'subcategory-list', title: 'Subcategories' },
    { path: 'family-list', title: 'Families' },
  ];
}
