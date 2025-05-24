import { TabContainerComponent } from '@/components/tab';
import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  imports: [TabContainerComponent],
  template: `
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-3/4">
        <app-tab-container [tabs]="tabs" />
      </div>
    </div>
  `,
  styles: ``,
})
export class StorePage {
  tabs = [
    { path: 'store-settings', title: 'Store' },
    { path: 'adjustment-settings', title: 'Adjustment' },
    { path: 'promotion-settings', title: 'Promotion' },
  ];
}
