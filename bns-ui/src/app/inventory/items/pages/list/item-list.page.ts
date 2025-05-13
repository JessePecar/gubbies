import { Component, effect, inject, signal, untracked } from '@angular/core';
import { ItemListService } from './item-list.service';
import { Item } from '@/inventory/items/interfaces/items';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TableComponent, ToolbarItem } from '@components/tables';
import { UserInfoService } from '@/services';
import { PermissionEnum } from '@/entities/role';
import { ItemComponent } from '@/inventory/items/ui/item.component';

@Component({
  selector: 'app-item-list',
  imports: [MatIconModule, ItemComponent, TableComponent],
  template: `<div class="h-full w-full flex justify-center items-center">
    <div class="w-3/4 view-container">
      <app-table [toolbarItems]="toolbarItems()">
        @for (item of items(); track $index) {
          <item [item]="item" />
        }
      </app-table>
    </div>
  </div> `,
})
export class ItemListPage {
  userInfoService = inject(UserInfoService);

  items = signal<Item[] | undefined>(undefined);
  router = inject(Router);

  toolbarItems = signal<ToolbarItem[]>([]);

  constructor(service: ItemListService) {
    service.getItems().subscribe(({ data: { items } }) => {
      this.items.set(items);
    });

    effect(() => {
      const permissions = this.userInfoService.permissions();
      untracked(() => {
        const permissionIndex = permissions?.findIndex(
          p => p.permissionId === PermissionEnum.CREATE_ITEM
        );

        if (permissionIndex && permissionIndex >= 0) {
          this.toolbarItems.set([
            {
              icon: 'add',
              text: 'Add Item',
              onClick: () => this.onCreateItem(),
            },
          ]);
        }
      });
    });
  }

  onCreateItem = async () => {
    await this.router.navigate(['inventory', 'items', 'create']);
  };
}
