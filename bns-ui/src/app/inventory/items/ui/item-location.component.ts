import { ButtonComponent } from '@/components/buttons';
import { CardModule } from '@/components/card';
import { ItemStore } from '@/inventory/items/store';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-location',
  imports: [CardModule, ButtonComponent, ReactiveFormsModule],
  template: `
    <card>
      <card-body>
        <form [formGroup]="itemStore.form">
          <div
            formGroupName="location"
            class="grid grid-cols-3 py-2 gap-2"></div>
        </form>
      </card-body>
      <card-footer>
        <div class="w-full flex justify-end space-x-4 pt-4">
          <app-button
            text="Cancel"
            buttonType="text"
            (handleClick)="onCancel()" />
          <app-button
            [disabled]="!true"
            text="Submit"
            buttonType="raised"
            (handleClick)="onSubmit()" />
        </div>
      </card-footer>
    </card>
  `,
  styles: ``,
})
export class ItemLocationComponent {
  itemStore = inject(ItemStore);

  onCancel() {}
  onSubmit() {}
}
