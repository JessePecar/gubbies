import { UserInfoService } from '@/services';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationDropdownDirective } from './navigation-dropdown.directive';
import { DropdownItem } from '@/components/navigation/dropdown-item.types';

@Component({
  selector: 'app-dropdown-item',
  imports: [RouterLink, NavigationDropdownDirective],
  template: `
    @if (option(); as option) {
      <ng-template navDropdown *hasPermission="option.permissionId">
        <div class="w-full mt-1">
          <a
            [routerLink]="option.route"
            class="hover:border-primary-dark hover:pl-4 transition duration-300 border-1 border-primary text-primary block w-full rounded-sm p-1 pl-3 text-[0.85rem]"
            >{{ option.linkTitle }}</a
          >
        </div>
      </ng-template>
    }
  `,
  styles: ``,
})
export class DropdownItemComponent {
  option = input.required<DropdownItem>();
  userInfoService = inject(UserInfoService);
}
