import { Component, computed, inject, signal } from '@angular/core';
import { ItemListService } from './item-list.service';
import { Item } from '@/inventory/models/items';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TableComponent } from '@components/tables';
import { ItemComponent } from './item.component';
import { UserInfoService } from '@/services';
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
    service.getItems().subscribe(({ data: { items } }) => {
      this.items.set(items);
    });
  }

  getToolbarItems() {
    const permissionIndex = this.userInfoService
      .user()
      .permissions?.findIndex(
        p => p.permissionId === PermissionEnum.CREATE_ITEM
      );

    // If the permission is found, we will add the toolbar item
    if (permissionIndex && permissionIndex >= 0) {
      return [{ icon: 'add', text: 'Add Item', onClick: this.onCreateItem }];
    }
    return [];
  }

  onCreateItem = async () => {
    console.log('Creating item')
    await this.router.navigate(['inventory/create']);
  }
}
