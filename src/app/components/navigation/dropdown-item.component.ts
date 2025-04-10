import { UserInfoService } from '@/services';
import { DropdownOption } from '@/types/components/navigation/DropdownOption';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationDropdownDirective } from './navigation-dropdown.directive';

@Component({
  selector: 'app-dropdown-item',
  imports: [RouterLink, NavigationDropdownDirective],
  template: `
    @if (option(); as option) {
      <ng-template navDropdown *hasPermission="option.permissionId">
        <div class="w-full my-1">
          <a
            [routerLink]="option.route"
            class="hover:border-primary-dark border-1 border-primary text-primary block w-full rounded-sm p-1 pl-3"
            >{{ option.linkTitle }}</a
          >
        </div>
      </ng-template>
    }
  `,
  styles: ``,
})
export class DropdownItemComponent {
  option = input.required<DropdownOption>();
  userInfoService = inject(UserInfoService);
}
