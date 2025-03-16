import { Role } from '@interfaces/settings/roles';
import { Component, input } from '@angular/core';

@Component({
  selector: 'role-item',
  imports: [],
  template: ` <p>{{ role().name }}</p> `,
  styles: ``,
})
export class RoleItemComponent {
  role = input.required<Role>();
}
