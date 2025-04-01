import { Component, computed, inject, signal } from '@angular/core';
import { ItemListService } from './item-list.service';
import { Item } from '../../models/items';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TableComponent } from '../../../components/tables/table.component';
import { ItemComponent } from './item.component';
import { UserDataService, UserInfoService } from '@/services';
import { PermissionEnum } from '@/entities/role';

@Component({
  selector: 'app-item-list',
  imports: [MatIconModule, ItemComponent, TableComponent],
  template: `
    <app-table [toolbarItems]="toolbar().items()">
      @for (item of items(); track $index) {
        <item [item]="item" />
      }
    </app-table>
  `,
})
export class ItemListComponent {
  userInfoService = inject(UserInfoService);

  items = signal<Item[] | undefined>(undefined);
  router = inject(Router);

  toolbar = computed(() => ({
    permissions: this.userInfoService.user().permissions,
    items: signal(this.getToolbarItems()),
  }));

  constructor(service: ItemListService) {
    service.getItems().subscribe(res => {
      this.items.set(res);
    });
  }

  getToolbarItems() {
    const permissionIndex = this.userInfoService
      .user()
      .permissions?.findIndex(
        p =>
          p.permissionId ===
          /* TODO: Change this to CREATE_ITEM*/ PermissionEnum.INVENTORY
      );

    // If the permission is found, we will add the toolbar item
    if (permissionIndex && permissionIndex > 0) {
      return [{ icon: 'add', text: 'Add Item', onClick: this.onCreateItem }];
    }
    return [];
  }

  async onCreateItem() {
    await this.router.navigate(['inventory/details']);
  }
}
