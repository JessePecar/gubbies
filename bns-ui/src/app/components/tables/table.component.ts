import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '@/components/buttons';

export type ToolbarItem = {
  icon: string;
  text: string;
  onClick: () => void | boolean | Promise<void> | Promise<boolean>;
};

@Component({
  selector: 'app-table',
  imports: [ButtonComponent, MatIcon],
  template: `
    <div class="flex justify-center items-center w-full h-full pr-2 lg:p-0">
      <div class="h-full w-full">
        <div
          class="min-h-10 p-1 flex justify-between shadow-md mb-2 rounded-t-lg">
          <div>
            <ng-content select="[header]" />
          </div>
          <!-- Toolbar will go here -->
          @for (toolbarItem of toolbarItems(); track $index) {
            <app-button (handleClick)="toolbarItem.onClick()">
              <span class="flex p-2">
                <mat-icon [fontIcon]="toolbarItem.icon" />
                <p>{{ toolbarItem.text }}</p>
              </span>
            </app-button>
          }
        </div>
        <div class="h-full rounded-lg">
          <div class="w-full h-full p-1 min-h-96 overflow-y-auto">
            <ng-content />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TableComponent {
  toolbarItems = input<ToolbarItem[]>();
}
