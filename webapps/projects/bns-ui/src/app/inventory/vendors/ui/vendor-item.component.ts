import { Vendor } from '@/inventory/vendors/store';
import {
  Component,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { ContextButtonComponent } from '@/core/components/buttons';
import { Router } from '@angular/router';
import { getLocationLine } from '@/bns-ui/utilities';
import { UserInfoService } from '@/bns-ui/common/services';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'vendor-item',
  imports: [ContextButtonComponent],
  template: `<div class="grid grid-cols-7 p-4">
    @if (vendor(); as vendor) {
      <div class="col-span-2">
        <p>{{ vendor.name }}</p>
        @if (vendor.notes) {
          <small>{{ vendor.notes }}</small>
        } @else {
          <small class="italic">No notes given</small>
        }
      </div>
      <div class="col-span-2">
        <div class="flex space-x-2 flex-wrap">
          <p>{{ vendor.address.address1 }}</p>
          @if (vendor.address.address2) {
            <p>{{ vendor.address.address2 }}</p>
          }
        </div>
        <div class="flex flex-wrap">
          <p>{{ formatAddress(vendor) }}</p>
        </div>
      </div>
      <div class="col-span-2">
        <small>Primary Contact Number</small>
        <p>{{ vendor.primaryPhone.nationalDigits }}</p>

        <small>Secondary Contact Number</small>
        <p>{{ vendor.secondaryPhone.nationalDigits }}</p>
      </div>
      <div class="col-span-1 flex justify-end">
        <div class="w-14">
          @if (contextOptions().length) {
            <context-button [options]="contextOptions()" />
          }
        </div>
      </div>
    }
  </div>`,
  styles: ``,
})
export class VendorItemComponent {
  router = inject(Router);
  userInfoService = inject(UserInfoService);

  vendor = input.required<Vendor>();
  contextOptions = signal<
    {
      name: string;
      iconName: string;
      onClickEvent: () => void;
    }[]
  >([]);

  constructor() {
    effect(() => {
      const permissions = this.userInfoService.permissions();

      untracked(() => {
        // TODO: Update to new Vendor specific permission
        if (
          permissions &&
          permissions.some(p => p.permissionId === PermissionEnum.EDIT_ITEM)
        ) {
          this.contextOptions.set([
            {
              iconName: 'edit',
              name: 'Edit Vendor',
              onClickEvent: () =>
                this.router.navigate(['inventory', 'vendors', 'details']),
            },
          ]);
          return;
        }
        this.contextOptions.set([]);
      });
    });
  }

  formatAddress = ({ address }: Vendor) => getLocationLine(address);
}
