import { TabComponent } from '@/components/tab/tab.component';
import {
  Component,
  ContentChildren,
  effect,
  QueryList,
  signal,
  untracked,
} from '@angular/core';

@Component({
  selector: 'app-tab-container',
  imports: [],
  template: `
    <ul class="tab-titles">
      @for (tab of tabs(); track $index) {
        <li [class.active]="tab.isActive()" (click)="onTabSelect(tab)">
          {{ tab.title() }}
        </li>
      }
    </ul>
    <ng-content></ng-content>
  `,
  styles: `
    .tab-titles {
      list-style: none;
      padding: 0;
      display: flex;
      cursor: pointer;
    }
    .tab-titles li {
      padding: 10px 20px;
      border: 1px solid var(--color-primary-dark);
      margin-right: 4px;
    }
    .tab-titles li.active {
      background-color: var(--color-primary-green);
      color: var(--color-primary);
    }
  `,
})
export class TabContainerComponent {
  @ContentChildren(TabComponent) tabQuery!: QueryList<TabComponent>;
  tabs = signal<TabComponent[]>([]);

  constructor() {
    effect(() => {
      const tabQuery = this.tabQuery;

      untracked(() => {
        // Set the signal and the current active tab
        const tabs = tabQuery.toArray();
        if (!tabs.some(tab => tab.isActive())) {
          tabs[0].isActive.set(true);
        }

        this.tabs.set(tabs);
      });
    });
  }

  onTabSelect(tabComponent: TabComponent) {
    this.tabs.update(tab => {
      tab.map(t => {
        t.isActive.set(false);

        return t;
      });

      return tab;
    });

    tabComponent.isActive.set(true);
  }
}
