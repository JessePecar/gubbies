import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PermissionEnum } from '@/core/types/role';
import {
  DropdownItem,
  DropdownItemComponent,
} from '@/core/components/navigation';

@Component({
  selector: 'app-navigation-dropdown',
  imports: [MatIconModule, DropdownItemComponent],
  template: `
    <div>
      <small
        class="w-full flex justify-between pl-2 py-1 text-primary-dark text-sm">
        <ng-content />
      </small>
      @for (opt of dropdownOptions(); track $index) {
        <app-dropdown-item class="w-full" [option]="opt" />
      }
    </div>
  `,
  styles: ``,
})
export class NavigationDropdownComponent {
  dropdownOptions = input.required<DropdownItem[]>();
  dropdownPermission = input.required<PermissionEnum>();
}
