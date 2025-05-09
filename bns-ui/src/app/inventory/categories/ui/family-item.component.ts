import { Family } from '@/inventory/categories/interfaces';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'family-item',
  imports: [MatIconModule],
  template: `
    <div class="grid grid-cols-4 p-2">
      <div class="flex items-center h-full">
        <p>{{ family().code }}</p>
      </div>
      <div class="flex items-center h-full">
        <p>{{ family().name }}</p>
      </div>
      <div class="col-span-2 flex justify-around items-center h-full">
        <div class="flex flex-col items-center">
          <p>Can Promote</p>
          <span
            [class]="
              family().canPromote
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                family().canPromote ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
        <div class="flex flex-col items-center">
          <p>Can Transfer</p>
          <span
            [class]="
              family().canTransfer
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                family().canTransfer ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
        <div class="flex flex-col items-center">
          <p>Can Change Price</p>
          <span
            [class]="
              family().canPriceChange
                ? 'text-primary-green'
                : 'text-red-400 brightness-75'
            ">
            <mat-icon
              [fontIcon]="
                family().canPriceChange ? 'check_box' : 'disabled_by_default'
              " />
          </span>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class FamilyItemComponent {
  family = input.required<Family>();
}
