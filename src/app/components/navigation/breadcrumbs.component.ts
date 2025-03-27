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
    @if (activeOptions().activeOptions(); as options) {
      <div class="flex space-x-1">
        <a [routerLink]="baseOption().route" (click)="onClickOption(-1)">{{
          baseOption().text
        }}</a>
        @for (option of options; track $index) {
          <mat-icon fontIcon="arrow_right" />
          <a
            (click)="onClickOption($index)"
            [routerLink]="baseOption().route"
            >{{ baseOption().text }}</a
          >
        }
      </div>
    }
  `,
  styles: ``,
})
export class BreadcrumbsComponent {
  // TODO: I think the best way to actually do this is have the bread crumbs check the route that is currently in use 
  // the breadcrumbs should have a base router, then it should look for each individual piece to determine if it's active
  breadcrumbOptions = input<BreadcrumbOption[]>([]);
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
