import { Component, effect, inject, input, untracked } from '@angular/core';
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
          [relativeTo]="getRelativeLink()"
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
  useParent = input<boolean>(false);

  route = inject(ActivatedRoute);
  router = inject(Router);

  getRelativeLink() {
    if (!this.useParent()) {
      return this.route;
    }
    return this.route.parent;
  }

  isActive(path: string) {
    return this.router.url.endsWith(`/${path}`);
  }

  constructor() {
    // On initialization of the tabs, will check if we are on tab, if not, we will navigate to the first tab in the list
    effect(() => {
      const tabs = this.tabs();

      untracked(() => {
        if (!tabs.some(tab => this.router.url.endsWith(tab.path))) {
          this.router.navigate([`${this.router.url}/${tabs[0].path}`]);
        }
      });
    });
  }
}
