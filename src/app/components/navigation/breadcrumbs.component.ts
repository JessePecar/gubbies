import { Component, computed, input, output, signal } from '@angular/core';
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
      <div class="flex w-2/3 justify-start">
        <div class="w-min flex px-5 py-3 rounded-full shadow-lg">
          <ul class="flex space-x-4 items-center">
            <li class="flex items-center">
              <mat-icon [fontIcon]="baseIcon()" />
            </li>
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

  content = computed(() => ({
    selectedContent: this.selectedContent,
    contentName: signal<string>(this.getSelector()),
  }));

  onOptionClicked = output<TOptionId>();

  onClickOption(id: TOptionId) {
    this.onOptionClicked.emit(id);
  }

  getSelector() {
    console.log(`[${this.selectedContent()}]`);
    return `[${this.selectedContent()}]`;
  }
}
