import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet, Routes } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [MatIconModule, RouterOutlet],
  template: `
    <div class="flex w-full justify-start mb-2">
      <ul class="flex space-x-2 items-center">
        <li class="flex items-center text-primary-blue">
          <mat-icon [fontIcon]="baseIcon()" />
        </li>
        @if (options().activeOptions(); as options) {
          @for (option of options; track $index) {
            <li class="flex space-x-2">
              @if ($index > 0) {
                <mat-icon fontIcon="chevron_right" />
              }
              <a
                class="text-nowrap cursor-pointer hover:text-primary-blue"
                (click)="onClickOption(option.path)"
                >{{ option.title }}</a
              >
            </li>
          }
        }
      </ul>
    </div>
    <div class="w-full h-full">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ``,
})
export class BreadcrumbsComponent {
  router = inject(Router);

  baseIcon = input.required<string>();
  breadcrumbOptions = input<Routes>([]);
  baseRoute = input.required<string[]>();

  options = computed(() => ({
    breadcrumbOptions: this.breadcrumbOptions(),
    activeRoute: signal<string>(this.router.url),
    activeOptions: signal(this.getActiveOptions(this.router.url)),
  }));

  onClickOption(route?: string) {
    if (route) {
      this.router.navigate([...this.baseRoute(), route]);
    }
  }

  getActiveOptions(route: string) {
    const activeOptionIndex = this.breadcrumbOptions().findIndex(bo =>
      route.endsWith(`/${bo.path}`)
    );

    const activeOptions = this.breadcrumbOptions().filter(
      (_, idx) => idx <= activeOptionIndex
    );

    if (activeOptions.length) {
      return activeOptions;
    }

    return [this.breadcrumbOptions()[0]];
  }
}
