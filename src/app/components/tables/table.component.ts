import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  imports: [ButtonComponent, MatIcon],
  template: `
    <div class="flex justify-center items-center w-full h-full">
      <div class="h-3/4 w-full lg:w-3/4">
        <div
          class="h-3/4 border border-stone-900 rounded-lg shadow-lg overflow-hidden">
          <!-- Toolbar will go here -->
          <div
            class="bg-violet-500 min-h-10 p-1 flex justify-end shadow-lg mb-2">
            @for (toolbarItem of toolbarItems(); track $index) {
              <app-button (handleClick)="toolbarItem.onClick()">
                <span class="flex p-2">
                  <mat-icon [fontIcon]="toolbarItem.icon" />
                  <p>{{ toolbarItem.text }}</p>
                </span>
              </app-button>
            }
          </div>
          <div class="w-full overflow-y-auto h-full p-1">
            <div class="h-full">
              <ng-content />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TableComponent {
  toolbarItems = input<
    {
      icon: string;
      text: string;
      onClick: () => void | Promise<void>;
    }[]
  >();
}
