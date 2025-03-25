import { Component } from '@angular/core';
import { NavigationDropdownComponentV2 } from './navigation-dropdown.componentV2';
import { PermissionEnum } from '@/entities/role';

@Component({
  selector: 'app-settings-nav-item',
  imports: [NavigationDropdownComponentV2],
  template: `
    <app-navigation-dropdownv2
      dropdownName="settings"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="settingsPermission">
      <p menuItem class="hover:underline">Settings</p>
    </app-navigation-dropdownv2>
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
  ];
}
