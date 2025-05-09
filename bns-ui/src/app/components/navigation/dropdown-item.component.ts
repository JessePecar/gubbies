import { UserInfoService } from '@/services';
import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationDropdownDirective } from './navigation-dropdown.directive';
import { DropdownItem } from '@/components/navigation/dropdown-item.types';

@Component({
  selector: 'app-dropdown-item',
  imports: [RouterLink, RouterLinkActive, NavigationDropdownDirective],
  template: `
    @if (option(); as option) {
      <ng-template navDropdown *hasPermission="option.permissionId">
        <div class="w-full mt-1">
          <a
            [routerLink]="option.route"
            routerLinkActive="bg-primary-blue-opaque hover:rounded-t-sm hover:rounded-b-none rounded-sm"
            class="hover:border-primary-green hover:bg-primary-green-opaque rounded-t-sm transition duration-300 border-b-1 border-transparent text-stone-800 block w-full p-1 pl-3 text-[0.85rem]"
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
