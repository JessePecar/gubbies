import { CardModule } from '@/components/card';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-vendor',
  imports: [CardModule],
  template: `
    <card>
      <card-body></card-body>
    </card>
  `,
  styles: ``,
})
export class CreateVendorComponent {}
