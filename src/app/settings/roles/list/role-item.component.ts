import { Role } from '@interfaces/settings/roles';
import { Component, inject, input, OnInit } from '@angular/core';
import { ContextButtonComponent } from '@/components';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'role-item',
  imports: [ContextButtonComponent, MatIconModule],
  template: `
    <div class="grid grid-cols-3 p-2">
      <div class="flex items-center space-x-2">
        <mat-icon fontIcon="manage_accounts" />
        <p class="pt-1">{{ role().name }}</p>
      </div>
      <div class="flex items-center">
        <p class="text-sm">{{ role().rolePermissions.length }} Permissions</p>
      </div>
      <div class="w-full flex justify-between items-center">
        <p>Tier {{ role().hierarchyTier }}</p>
        <div class="flex justify-center items-center w-10">
          <context-button [options]="userContextMenu" />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RoleItemComponent implements OnInit {
  router = inject(Router);

  role = input.required<Role>();
  userContextMenu: {
    name: string;
    iconName: string;
    onClickEvent: () => void;
  }[] = [];

  ngOnInit(): void {
    // Check if we can use this
    this.userContextMenu.push({
      name: 'Edit Role',
      iconName: 'edit',
      onClickEvent: () => this.onEditRole(),
    });
  }

  onEditRole() {
    this.router.navigate(['settings', 'roles', 'details'], {
      queryParams: {
        roleId: this.role().id,
      },
    });
  }
}
