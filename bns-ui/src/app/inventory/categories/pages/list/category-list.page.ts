import { TableComponent, ToolbarItem } from '@/components/tables';
import { PermissionEnum } from '@/entities/role';
import { CategoryListService } from '@/inventory/categories/pages/list/category-list.service';
import { UserInfoService } from '@/services';
import { Component, effect, inject, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-category-list',
  imports: [TableComponent],
  template: `
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-3/4">
        <app-table [toolbarItems]="toolbarItems()"></app-table>
      </div>
    </div>
  `,
  styles: ``,
})
export class CategoryListPage {
  userInfoService = inject(UserInfoService);
  categoryListService = inject(CategoryListService);

  toolbarItems = signal<ToolbarItem[]>([]);

  constructor() {
    effect(() => {
      const permissions = this.userInfoService.permissions();

      untracked(() => {
        if (
          permissions &&
          permissions.some(
            permission => permission.permissionId === PermissionEnum.EDIT_ITEM
          )
        ) {
          this.toolbarItems.set([
            {
              icon: 'add',
              onClick: this.onAddCategory,
              text: 'Add Category',
            },
          ]);
        } else {
          this.toolbarItems.set([]);
        }
      });
    });
  }

  onAddCategory() {}
}
