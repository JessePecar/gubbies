import { UserInfoService } from '@/services';
import { DropdownOption } from '@/types/components/navigation/DropdownOption';
import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  effect,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationDropdownDirective } from './navigation-dropdown.directive';

@Component({
  selector: 'app-dropdown-item',
  imports: [RouterLink, NavigationDropdownDirective],
  template: `
    <div class="w-full" *hasPermission="option().permissionId">
      @if (option(); as option) {
        <a
          [routerLink]="option.route"
          class="w-full hover:bg-stone-800 rounded-sm p-1 "
          >{{ option.linkTitle }}</a
        >
      }
    </div>
  `,
  styles: ``,
})
export class DropdownItemComponent {
  option = input.required<DropdownOption>();
  userInfoService = inject(UserInfoService);
}
