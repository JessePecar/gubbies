import { TableComponentV2, ToolbarItem } from '@/components/tables';
import { PermissionEnum } from '@/entities/role';
import { CategoryListService } from '@/inventory/categories/pages/list/category-list.service';
import { UserInfoService } from '@/services';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { CategoryItemComponent } from '@/inventory/categories/ui/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [TableComponentV2, CategoryItemComponent],
  template: `
    <div class="h-full w-full flex justify-center pt-20">
      <div class="w-3/4">
        <app-table-v2
          [useExpand]="true"
          [columns]="categoryListService.columnDefinitions"
          [items]="categoryListService.categories()">
        </app-table-v2>
      </div>
    </div>
  `,
  styles: ``,
})
export class CategoryListPage {
  userInfoService = inject(UserInfoService);
  categoryListService = inject(CategoryListService);

  router = inject(Router);

  toolbarItems = signal<ToolbarItem[]>([]);

  constructor() {
    this.categoryListService.loadCategories();
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
              onClick: async () => this.onAddCategory(),
              text: 'Add Category',
            },
          ]);
        } else {
          this.toolbarItems.set([]);
        }
      });
    });
  }

  async onAddCategory() {
    await this.router.navigate(['inventory', 'categories', 'create']);
  }
}
