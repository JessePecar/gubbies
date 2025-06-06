import { PermissionEnum } from '@/entities/role';
import { User } from '@/interfaces/settings/users';
import { UserInfoService } from '@/services';
import {
  Directive,
  effect,
  inject,
  Input,
  OnInit,
  TemplateRef,
  untracked,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[navDropdown], [hasPermission]', //TODO: Determine if more are needed
  standalone: true,
  providers: [],
})
export class NavigationDropdownDirective {
  userInfoService = inject(UserInfoService);

  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<unknown>);

  @Input('hasPermission')
  permission?: PermissionEnum;

  //TODO: Add any additional selectors

  constructor() {
    effect(() => {
      var userInfo = this.userInfoService.userInfo();

      untracked(() => {
        this.checkAccess();
      });
    });
  }

  checkAccess() {
    const permissions = this.userInfoService.permissions();
    if (permissions) {
      const rolePermission = permissions.some(
        rp => rp.permissionId === this.permission
      );

      // If the user has the role, or there is no guard, show the content
      if (rolePermission !== undefined || this.permission === undefined) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        return;
      }
    }

    this.viewContainer.clear();
  }
}
