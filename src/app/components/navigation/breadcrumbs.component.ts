import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type BreadcrumbOption<TOptionId> = {
  text: string;
  id: TOptionId;
};

@Component({
  selector: 'app-breadcrumbs',
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col justify-center items-center h-full w-full">
      <div class="flex w-2/3 justify-start mb-2">
        <div class="w-min flex px-5 py-3">
          <ul class="flex space-x-4 items-center">
            <li class="flex items-center text-primary-blue">
              <mat-icon [fontIcon]="baseIcon()" />
            </li>
            @if (breadcrumbOptions(); as options) {
              @for (option of options; track $index) {
                <li class="flex space-x-2">
                  @if ($index > 0) {
                    <mat-icon fontIcon="chevron_right" />
                  }
                  <a
                    class="text-nowrap cursor-pointer hover:text-primary-green"
                    (click)="onClickOption(option.id)"
                    >{{ option.text }}</a
                  >
                </li>
              }
            }
          </ul>
        </div>
      </div>
      <div class="w-2/3">
        <ng-content />
      </div>
    </div>
  `,
  styles: ``,
})
export class BreadcrumbsComponent<TOptionId> {
  baseIcon = input.required<string>();
  breadcrumbOptions = input<BreadcrumbOption<TOptionId>[]>([]);
  selectedContent = input.required<TOptionId>();

  onOptionClicked = output<TOptionId>();

  onClickOption(id: TOptionId) {
    this.onOptionClicked.emit(id);
  }
}
