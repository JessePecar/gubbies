/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet],
  template: `
    <div class="h-full w-full">
      <router-outlet />
    </div>
  `,
})
export class SettingsPage {}
