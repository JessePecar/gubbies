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
      <div class="flex flex-col items-center h-full">
        <p>Can Promote</p>
        <mat-icon
          class="text-primary-green"
          [fontIcon]="
            family().canPromote ? 'disabled_by_default' : 'priority'
          " />
      </div>
      <div class="flex flex-col items-center h-full">
        <p>Can Transfer</p>
        <mat-icon
          class="text-primary-green"
          [fontIcon]="
            family().canTransfer ? 'disabled_by_default' : 'priority'
          " />
      </div>
      <div class="flex flex-col items-center h-full">
        <p>Can Change Price</p>
        <mat-icon
          class="text-primary-green"
          [fontIcon]="
            family().canPriceChange ? 'disabled_by_default' : 'priority'
          " />
      </div>
    </div>
  `,
  styles: ``,
})
export class FamilyItemComponent {
  family = input.required<Family>();
}
