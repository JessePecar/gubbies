import { Component, effect, inject, signal, untracked } from '@angular/core';
import { VendorListService } from './vendor-list.service';
import {
  TableComponent,
  ToolbarItem,
} from '@/core/components/tables/table.component';
import { VendorItemComponent } from '@/inventory/vendors/ui/vendor-item.component';
import { Router } from '@angular/router';
import { UserInfoService } from '@/core/services/user';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-vendor-list',
  imports: [TableComponent, VendorItemComponent],
  template: `<div class="h-full w-full flex justify-center items-center">
    <div class="w-3/4 view-container">
      <app-table [toolbarItems]="toolbarItems()">
        @if (vendorListService.vendors().length > 0) {
          @for (vendor of vendorListService.vendors(); track $index) {
            <vendor-item [vendor]="vendor" />
            <hr class="border-primary-dark  mb-1" />
          }
        } @else {
          <div class="flex w-full justify-center items-cetner">
            <p>No Vendors found.</p>
          </div>
        }
      </app-table>
    </div>
  </div>`,
  styles: ``,
})
export class VendorListComponent {
  vendorListService = inject(VendorListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  toolbarItems = signal<ToolbarItem[]>([]);

  constructor() {
    effect(() => {
      const permissions = this.userInfoService.permissions();

      untracked(() => {
        // TODO: Update to new Vendor specific permission
        if (
          permissions &&
          permissions.some(p => p.permissionId === PermissionEnum.EDIT_VENDOR)
        ) {
          this.toolbarItems.set([
            {
              icon: 'add',
              text: 'Add Vendor',
              onClick: () =>
                this.router.navigate(['inventory', 'vendors', 'create']),
            },
          ]);
          return;
        }
        this.toolbarItems.set([]);
      });
    });
  }
}
