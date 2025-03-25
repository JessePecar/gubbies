import { UserInfoService } from '@/services';
import { DropdownOption } from '@/types/components/navigation/DropdownOption';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-item',
  imports: [RouterLink],
  template: `
    @if (option(); as option) {
      @if (!option.permissionId || hasAccess()) {
        <a
          [routerLink]="option.route"
          class="w-full hover:bg-stone-800 rounded-sm p-1 "
          >{{ option.linkTitle }}</a
        >
      }
    }
  `,
  styles: ``,
})
export class DropdownItemComponent implements OnInit {
  option = input.required<DropdownOption>();
  userInfoService = inject(UserInfoService);

  hasAccess = signal<boolean>(false);

  setHasAccess() {
    if (this.option().permissionId) {
      var permission = this.userInfoService
        .userInfo()
        ?.role.rolePermissions.find(
          rp => rp.permissionId === this.option().permissionId
        );

      this.hasAccess.set(permission !== undefined);
    }

    return this.hasAccess.set(true);
  }

  ngOnInit(): void {
    this.setHasAccess();

    this.userInfoService.onUserChange().subscribe(() => {
      this.setHasAccess();
    });
  }
}
