import { TabContainerComponent } from '@/core/components/tab';
import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  imports: [TabContainerComponent],
  template: `
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-3/4">
        <app-tab-container [useParent]="false" [tabs]="tabs" />
      </div>
    </div>
  `,
  styles: ``,
})
export class StorePage {
  tabs = [
    { path: 'settings', title: 'Store' },
    { path: 'adjustment-settings', title: 'Adjustment' },
    { path: 'promotion-settings', title: 'Promotion' },
  ];
}
