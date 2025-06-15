import { CardModule } from '@/core/components/card';
import { Component, inject } from '@angular/core';
import { VendorStoreService } from '@/inventory/vendors/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '@/core/components/navigation/breadcrumbs';
import { CreateVendorService } from './create-vendor.service';
import { ButtonComponent } from '@/core/components/buttons/button.component';
import { Router } from '@angular/router';
import { vendorCreateRoutes } from '@/bns-ui/inventory/vendors/create/create-vendor.routes';

@Component({
  selector: 'app-create-vendor',
  imports: [
    CardModule,
    ReactiveFormsModule,
    BreadcrumbsComponent,
    ButtonComponent,
  ],
  template: `
    <div class="h-full w-full">
      <div class="absolute pt-4">
        <app-button
          buttonType="text"
          color="primary"
          icon="chevron_left"
          (handleClick)="onBackClicked()"
          text="Vendor List" />
      </div>
      <app-breadcrumbs
        baseIcon="local_shipping"
        [baseRoute]="['inventory', 'vendors', 'create']"
        [breadcrumbOptions]="getBreadcrumbs()" />
    </div>
  `,
  styles: ``,
})
export class CreateVendorComponent {
  vendorStore = inject(VendorStoreService);
  router = inject(Router);

  private readonly createVendorService = inject(CreateVendorService);

  onSubmit() {
    const vendorFormValue = this.vendorStore.form.value;

    this.createVendorService.onCreate(vendorFormValue);
  }

  onBackClicked() {
    this.router.navigate(['inventory', 'vendors', 'list']);
  }

  getBreadcrumbs() {
    return vendorCreateRoutes.filter(icr => icr.component !== undefined);
  }
}
