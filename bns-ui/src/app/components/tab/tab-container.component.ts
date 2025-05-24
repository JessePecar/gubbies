import { Component, inject, input } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

interface TabInfo {
  path: string;
  title: string;
}

@Component({
  selector: 'app-tab-container',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <ul class="tab-titles">
      @for (tab of tabs(); track $index) {
        <li
          class="rounded-t p-3 py-2"
          [routerLink]="tab.path"
          [relativeTo]="route.parent"
          [class.active]="isActive(tab.path)"
          routerLinkActive="active text-primary">
          {{ tab.title }}
        </li>
      }
    </ul>
    <div class="view-container shadow-inset p-2 rounded-b rounded-tr">
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
      border: 1px solid transparent;
      background:
        linear-gradient(var(--color-primary), var(--color-primary)) padding-box,
        linear-gradient(
            var(--color-primary-green-opaque),
            var(--color-primary-green-opaque),
            var(--color-primary)
          )
          border-box;
      margin-right: 4px;
      &:hover {
        background: var(--color-primary-green-opaque);
      }
    }
    .active {
      background: linear-gradient(
        var(--color-primary-green),
        var(--color-secondary-green)
      ) !important;

      &:hover {
        background: var(--color-primary-green) !important;
      }
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
