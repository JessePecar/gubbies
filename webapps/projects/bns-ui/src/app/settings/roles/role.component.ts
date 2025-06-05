import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-role',
  imports: [RouterOutlet],
  template: `<div class="h-full w-full"><router-outlet /></div>`,
})
export class RoleComponent {}
