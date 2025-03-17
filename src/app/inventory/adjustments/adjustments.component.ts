import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adjustments',
  imports: [RouterOutlet],
  template: `
    <div class="p-4">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class AdjustmentsComponent {}
