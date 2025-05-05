import { Component, inject, input } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

interface TabInfo {
  path: string;
  title: string;
}

@Component({
  selector: 'app-tab-container',
  imports: [RouterOutlet, RouterLink],
  template: `
    <ul class="tab-titles">
      @for (tab of tabs(); track $index) {
        <li
          class="rounded-t p-3 py-2"
          [routerLink]="tab.path"
          [relativeTo]="route.parent"
          [class.active]="isActive(tab.path)"
          routerLinkActive="active">
          {{ tab.title }}
        </li>
      }
    </ul>
    <div class="tab-view-container">
      <router-outlet />
    </div>
  `,
  styles: `
    .tab-titles {
      list-style: none;
      padding: 0;
      display: flex;
      cursor: pointer;
    }
    .tab-titles li {
      border: 1px solid var(--color-primary-dark);
      margin-right: 4px;
    }
    .active {
      background-color: var(--color-primary-blue);
      color: var(--color-primary);
    }
    .tab-view-container {
      height: calc(75vh - 40px);
    }
  `,
})
export class TabContainerComponent {
  tabs = input<TabInfo[]>([]);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isActive(path: string) {
    return this.router.url.endsWith(`/${path}`);
  }
}
