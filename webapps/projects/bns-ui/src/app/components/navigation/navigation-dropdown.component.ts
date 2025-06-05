import {
  Component,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarService } from '@/bns-ui/components/navigation/navbar.service';
import { UserInfoService } from '@/core/services/user';
import { NavigationDropdownDirective } from './navigation-dropdown.directive';
import { PermissionEnum } from '@/core/types/role';
import {
  DropdownItem,
  DropdownItemComponent,
} from '@/core/components/navigation';

@Component({
  selector: 'app-navigation-dropdown',
  imports: [MatIconModule, DropdownItemComponent, NavigationDropdownDirective],
  template: `
    <ng-template navDropdown *hasPermission="dropdownPermission()">
      <small
        class="w-full flex justify-between pl-2 py-1 text-primary-dark text-sm">
        <ng-content select="[menuItem]" />
      </small>
      <!-- Drop down menu -->
      @for (opt of dropdownOptions(); track $index) {
        <app-dropdown-item class="w-full" [option]="opt" />
      }
    </ng-template>
  `,
  styles: ``,
})
export class NavigationDropdownComponent {
  @ViewChild('menu')
  menu!: ElementRef<HTMLDivElement>;

  navbarService = inject(NavbarService);
  userInfoService = inject(UserInfoService);

  dropdownOptions = input.required<DropdownItem[]>();

  showArrow = input<boolean>(true);

  dropdownName = input<string>('');

  showMenu = signal<boolean>(false);

  dropdownPermission = input.required<PermissionEnum>();

  toggleMenu() {
    const name = this.dropdownName();
    this.showMenu.set(!this.showMenu());
    this.showMenu()
      ? (this.menu.nativeElement.style.maxHeight = '200px')
      : (this.menu.nativeElement.style.maxHeight = '0px');

    if (this.showMenu()) {
      this.navbarService?.tiggerEvent(name);
    }
  }
}
