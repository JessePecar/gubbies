import { Component, computed, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

type BreadcrumbOption = {
  text: string;
  route: string;
  active: boolean;
};

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, MatIconModule],
  template: `
    <!-- TODO: Determine the rounded I want -->
    <div class="flex px-5 py-3 rounded-full shadow-lg">
      <ul class="flex space-x-4 items-center">
        <li>
          <a
            class="flex items-center space-x-2 hover:text-purple-400"
            [routerLink]="baseOption().route"
            (click)="onClickOption(-1)">
            <mat-icon class="icon" [inline]="true" [fontIcon]="baseIcon()" />
            <span>{{ baseOption().text }}</span>
          </a>
        </li>
        @if (activeOptions().activeOptions(); as options) {
          @for (option of options; track $index) {
            <mat-icon fontIcon="chevron_right" />
            <a
              class="hover:text-purple-400"
              (click)="onClickOption($index)"
              [routerLink]="option.route"
              >{{ option.text }}</a
            >
          }
        }
      </ul>
    </div>
  `,
  styles: `
    .icon {
      font-size: 1.2rem;
    }
  `,
})
export class BreadcrumbsComponent {
  // TODO: I think the best way to actually do this is have the bread crumbs check the route that is currently in use
  // the breadcrumbs should have a base router, then it should look for each individual piece to determine if it's active
  baseIcon = input.required<string>();
  breadcrumbOptions = input<BreadcrumbOption[]>([]);
  currentOption = signal<number>(0);

  baseOption = input.required<BreadcrumbOption>();

  // This creates a copy of the input prop to a signal so we can write to it
  options = computed(() => ({
    breadcrumbOptions: this.breadcrumbOptions(),
    availableOptions: signal<BreadcrumbOption[]>(this.breadcrumbOptions()),
  }));

  // When the available options changes, we will update the active options accordingly
  activeOptions = computed(() => ({
    availableOptions: signal(this.options().availableOptions()),
    activeOptions: signal(
      this.options()
        .availableOptions()
        .filter(bo => bo.active)
    ),
  }));

  onClickOption(idx: number) {
    var updatedAvailableOptions = this.options()
      .availableOptions()
      .map((option, index) => {
        if (idx + 1 >= index) {
          option.active = true;
        }

        return option;
      });
    this.options().availableOptions.set(updatedAvailableOptions);
  }
}
