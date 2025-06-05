import { Component } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-settings-nav-item',
  imports: [NavigationDropdownComponent],
  template: `
    <app-navigation-dropdown
      dropdownName="settings"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="settingsPermission">
      <p menuItem>Settings</p>
    </app-navigation-dropdown>
  `,
  styles: ``,
})
export class SettingsNavItemComponent {
  settingsPermission = PermissionEnum.SETTINGS;
  dropdownOptions = [
    {
      linkTitle: 'Users',
      route: '/settings/users/list',
    },
    {
      linkTitle: 'Roles',
      route: '/settings/roles/list',
    },
    {
      linkTitle: 'Settings',
      route: '/settings/store',
    },
  ];
}
