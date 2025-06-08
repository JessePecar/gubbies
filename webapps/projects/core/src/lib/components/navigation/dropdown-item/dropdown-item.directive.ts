import { PermissionEnum } from '@/core/types/role';
import { User } from '@/models/auth/user';
import { UserInfoService } from '@/bns-ui/common/services';
import {
  Directive,
  effect,
  inject,
  Input,
  TemplateRef,
  untracked,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[navDropdown], [hasPermission]', //TODO: Determine if more are needed
  standalone: true,
  providers: [],
})
export class DropdownItemDirective {
  userInfoService = inject(UserInfoService);

  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<unknown>);

  @Input('hasPermission')
  permission?: PermissionEnum;

  //TODO: Add any additional selectors

  constructor() {
    effect(() => {
      var _ = this.userInfoService.userInfo();

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
