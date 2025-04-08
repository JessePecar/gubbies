import { Component, inject } from '@angular/core';
import { VendorListService } from './vendor-list.service';

@Component({
  selector: 'app-vendor-list',
  imports: [],
  template: ` <p>vendor-list works!</p> `,
  styles: ``,
})
export class VendorListComponent {
  vendorListService = inject(VendorListService);
}
