import { ButtonComponent } from '@/components/buttons';
import { CardComponent } from '@/components/card/card.component';
import {
  BreadcrumbOption,
  BreadcrumbsComponent,
} from '@/components/navigation/breadcrumbs.component';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-create',
  imports: [ButtonComponent, CardComponent, BreadcrumbsComponent],
  template: `
    <div class="pl-20 h-full overflow-hidden">
      <app-breadcrumbs
        baseIcon="account_circle"
        (onOptionClicked)="onOptionClicked($event)"
        [breadcrumbOptions]="activeOptions()" />
      <div class="flex w-full h-full items-center justify-center">
        <card class="w-1/2 h-1/2">
          <div class="h-full flex justify-end items-end p-8">
            <div>
              <app-button
                contentType="full-center"
                class="w-full"
                (click)="onMoveToNext()"
                text="Next" />
            </div>
          </div>
        </card>
      </div>
    </div>
  `,
  styles: ``,
})
export class UserCreateComponent {
  defaultOptions: BreadcrumbOption[] = [
    { text: 'User Information', id: 'info' },
    { text: 'Address', id: 'address' },
    { text: 'Phone', id: 'phone' },
  ];

  activeOptions = signal<BreadcrumbOption[]>([this.defaultOptions[0]]);

  onOptionClicked(id: string | number) {
    var index = this.defaultOptions.findIndex(opt => opt.id === id);

    this.setActiveOptions(index);
  }

  onMoveToNext() {
    // If there are more options to add, then add the active option
    if (this.activeOptions().length < this.defaultOptions.length) {
      this.setActiveOptions(this.activeOptions().length);
    }
  }

  setActiveOptions(index: number) {
    // If id doesn't exist, we will just reset to the beginning
    if (index === -1) {
      this.activeOptions.set([this.defaultOptions[0]]);
    } else {
      // Set the active options to the default options that have a lesser or equal index
      this.activeOptions.set(
        this.defaultOptions.filter((_, idx) => idx <= index)
      );
    }
  }
}
