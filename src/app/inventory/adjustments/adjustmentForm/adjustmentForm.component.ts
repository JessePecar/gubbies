import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../components/button.component';
import { TextInputComponent } from '../../../components/text-input.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdjustmentFormService } from './adjustmentForm.service';
import { Item } from '../../models/items';

@Component({
  selector: 'app-adjustments-form',
  imports: [TextInputComponent, ButtonComponent],
  template: `
    <div>
      <div
        class="p-2 border-b border-stone-800 fixed top-0 right-0 left-0 flex justify-end space-x-4 bg-stone-900 shadow-lg">
        <app-button
          buttonType="outline"
          (handleClick)="onCancel()"
          text="Cancel" />
        <app-button buttonType="outline" (handleClick)="onSave()" text="Save" />
        <app-button
          buttonType="raised"
          (handleClick)="onSubmit()"
          text="Submit" />
      </div>
      <div class="mt-10 p-4 bg-stone-900 rounded-lg shadow-lg">
        <div>
          <!-- Input for the Adjustment Type -->
          <div class="w-1/4 min-w-36">
            <app-text-input label="Adjustment Type" />
          </div>

          <div class="p-4 w-full">
            <table
              class="table-fixed w-full bg-stone-800 rounded max-h-96 overflow-y-auto">
              <thead
                class="bg-stone-900 border-b border-stone-700 shadow-lg divide-x divide-stone-700">
                <th class="text-lg px-2 text-start w-1/5">Category</th>
                <th class="text-lg px-2 text-start w-1/4">Name</th>
                <th class="text-lg px-2 text-start">Quantity on Hand</th>
                <th class="text-lg px-2 text-start">Unit of Measurement</th>
              </thead>
              <tbody class="mt-2 divide-y divide-stone-700">
                @for (item of items(); track $index) {
                  <tr class="even:bg-stone-900">
                    <td class="p-2">{{ item.category.name }}</td>
                    <td class="p-2">{{ item.name }}</td>
                    <td class="p-2">{{ item.quantityOnHand }}</td>
                    <td class="p-2">{{ item.unitOfMeasurementType }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdjustmentFormComponent {
  router = inject(Router);
  adjustmentFormService = inject(AdjustmentFormService);

  items = signal<Item[] | undefined>(undefined);

  onSubmit() {
    // Submit to the service
  }

  onCancel() {
    // Prompt user to tell them changes will be lost
    // Navigate back to /adjustments
    this.router.navigate(['inventory/adjustments']);
  }

  onSave() {
    // Save changes to the api, but don't set the status to done/completed
  }

  // Get active, non-deleted items to add to the adjustment
  getItems() {
    this.adjustmentFormService.getItems().subscribe(result => {
      this.items.set(result);
    });
  }

  constructor() {
    this.getItems();
  }
}
