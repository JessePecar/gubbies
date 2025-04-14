import { Role } from '@interfaces/settings/roles';
import { Component, inject, input, OnInit } from '@angular/core';
import { ContextButtonComponent } from '@/components/buttons';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserInfoService } from '@/services';

@Component({
  selector: 'role-item',
  imports: [ContextButtonComponent, MatIconModule],
  template: `
    <div class="grid grid-cols-3 p-2 min-h-16 text-primary">
      <div class="flex items-center space-x-2">
        <mat-icon fontIcon="manage_accounts" />
        <p class="pt-1">{{ role().name }}</p>
      </div>
      <div class="flex items-center">
        <p class="text-sm">{{ role().rolePermissions.length }} Permissions</p>
      </div>
      <div class="w-full flex justify-between items-center">
        <p>Tier {{ role().hierarchyTier }}</p>
        @if (userContextMenu.length > 0) {
          <div class="flex justify-center items-center w-10">
            <context-button [options]="userContextMenu" />
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class RoleItemComponent implements OnInit {
  router = inject(Router);
  userInfoService = inject(UserInfoService);

  role = input.required<Role>();
  userContextMenu: {
    name: string;
    iconName: string;
    onClickEvent: () => void;
  }[] = [];

  ngOnInit(): void {
    // Check if we can use this
    const role = this.userInfoService.role();

    // If the role we are looking at has a higher hiearchy tier, then we can edit it
    if (role && this.role().hierarchyTier > role.hierarchyTier) {
      this.userContextMenu.push({
        name: 'Edit Role',
        iconName: 'edit',
        onClickEvent: () => this.onEditRole(),
      });
    }
  }

  onEditRole() {
    this.router.navigate(['settings', 'roles', 'details'], {
      queryParams: {
        roleId: this.role().id,
      },
    });
  }
}
