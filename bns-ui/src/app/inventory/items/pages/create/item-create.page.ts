import { BreadcrumbsComponent } from '@/components/navigation/breadcrumbs';
import { Component, signal } from '@angular/core';
import { itemCreateRoutes } from './item-create.routes';

@Component({
  selector: 'app-item-create',
  imports: [BreadcrumbsComponent],
  template: ` <div class="h-full w-full flex justify-center items-center">
    <div class="w-3/4 view-container">
      <app-breadcrumbs
        baseIcon="shelves"
        [baseRoute]="['inventory', 'items', 'create']"
        [breadcrumbOptions]="getBreadcrumbs()">
      </app-breadcrumbs>
    </div>
  </div>`,
  styles: ``,
})
export class ItemCreatePage {
  activeOptions = signal([]);
  selectedOption = signal('');

  getBreadcrumbs() {
    return itemCreateRoutes.filter(icr => icr.component !== undefined);
  }
}
