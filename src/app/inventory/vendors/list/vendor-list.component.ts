import { Component, effect, inject, signal, untracked } from '@angular/core';
import { VendorListService } from './vendor-list.service';
import {
  TableComponent,
  ToolbarItem,
} from '@/components/tables/table.component';
import { VendorItemComponent } from '@/inventory/vendors/ui/vendor-item.component';
import { UserInfoService } from '@/services';
import { PermissionEnum } from '@/entities/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  imports: [TableComponent, VendorItemComponent],
  template: ` <app-table [toolbarItems]="toolbarItems()">
    @if (vendorListService.vendors().length > 0) {
      @for (vendor of vendorListService.vendors(); track $index) {
        <div
          class="even:bg-primary-dark odd:border odd:border-stone-900 bg-primary border-stone-800 mb-1 rounded">
          <!-- <user-item [user]="user" /> -->
          <vendor-item [vendor]="vendor" />
        </div>
      }
    } @else {
      <div class="flex w-full justify-center items-cetner">
        <p>No Vendors found.</p>
      </div>
    }
  </app-table>`,
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
          permissions.some(p => p.permissionId === PermissionEnum.EDIT_ITEM)
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
