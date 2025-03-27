import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type BreadcrumbOption = {
  text: string;
  id: string | number;
};

@Component({
  selector: 'app-breadcrumbs',
  imports: [MatIconModule],
  template: `
    <!-- TODO: Determine the rounded I want -->
    <div class="w-min flex px-5 py-3 rounded-full shadow-lg">
      <ul class="flex space-x-4 items-center">
        <li class="flex items-center">
          <mat-icon [fontIcon]="baseIcon()" />
        </li>
        <!-- <li>
          <a
            class="flex items-center space-x-2 hover:text-purple-400"
            (click)="onClickOption(baseOption().id)">
            
            <span class="text-nowrap">{{ baseOption().text }}</span>
          </a>
        </li> -->
        @if (breadcrumbOptions(); as options) {
          @for (option of options; track $index) {
            <li class="flex space-x-2">
              @if ($index > 0) {
                <mat-icon fontIcon="chevron_right" />
              }
              <a
                class="text-nowrap hover:text-purple-400"
                (click)="onClickOption(option.id)"
                >{{ option.text }}</a
              >
            </li>
          }
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class BreadcrumbsComponent {
  // TODO: I think the best way to actually do this is have the bread crumbs check the route that is currently in use
  // the breadcrumbs should have a base router, then it should look for each individual piece to determine if it's active
  baseIcon = input.required<string>();
  breadcrumbOptions = input<BreadcrumbOption[]>([]);

  onOptionClicked = output<string | number>();

  onClickOption(id: string | number) {
    this.onOptionClicked.emit(id);
  }
}
