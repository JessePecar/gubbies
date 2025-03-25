import {
  Component,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarService } from '@/services/navbar.service';
import { ButtonComponent } from '../button.component';
import { UserInfoService } from '@/services';
import { DropdownOption } from '@/types/components/navigation/DropdownOption';
import { DropdownItemComponent } from '@/components/navigation/dropdown-item.component';

@Component({
  selector: 'app-navigation-dropdownv2',
  imports: [MatIconModule, ButtonComponent, DropdownItemComponent],
  template: `
    @if (canViewDropdown()) {
      <div>
        <app-button (click)="toggleMenu()">
          <div class="w-full flex justify-between pl-4 py-1">
            <ng-content select="[menuItem]" />
            @if (showArrow()) {
              <mat-icon
                [class]="
                  'transition duration-200 ' +
                  (showMenu() ? 'rotate-180' : 'rotate-0')
                "
                fontIcon="keyboard_arrow_down" />
            }
          </div>
        </app-button>
        <!-- Drop down menu -->
        <div
          #menu
          (blur)="toggleMenu()"
          style="max-height: 0px;"
          class="w-full transition-all duration-200 overflow-hidden pl-4">
          <div
            class="flex flex-col border-t border-stone-800 pt-1 divide-y divide-stone-800 w-full">
            @for (opt of dropdownOptions(); track $index) {
              <app-dropdown-item [option]="opt" />
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class NavigationDropdownComponentV2 {
  @ViewChild('menu')
  menu!: ElementRef<HTMLDivElement>;

  canViewDropdown = signal<boolean>(false);

  setCanViewDropdown() {
    var canView =
      this.userInfoService
        .userInfo()
        ?.role.rolePermissions.find(
          rp => rp.permissionId === this.dropdownPermission()
        ) !== undefined;

    this.canViewDropdown.set(canView);
  }

  navbarService = inject(NavbarService);
  userInfoService = inject(UserInfoService);

  dropdownOptions = input.required<DropdownOption[]>();

  showArrow = input<boolean>(true);

  dropdownName = input<string>('');

  showMenu = signal<boolean>(false);

  dropdownPermission = input.required<number>();

  toggleMenu() {
    const name = this.dropdownName();
    this.showMenu.set(!this.showMenu());
    this.showMenu()
      ? (this.menu.nativeElement.style.maxHeight = '100px')
      : (this.menu.nativeElement.style.maxHeight = '0px');

    if (this.showMenu()) {
      this.navbarService?.tiggerEvent(name);
    }
  }

  hasAccess(permissionId: number) {
    return (
      this.userInfoService
        .userInfo()
        ?.role?.rolePermissions.find(rp => rp.permissionId === permissionId) !==
      undefined
    );
  }

  ngOnInit(): void {
    this.setCanViewDropdown();

    this.userInfoService.onUserChange().subscribe(() => {
      this.setCanViewDropdown();
    });
  }
}
