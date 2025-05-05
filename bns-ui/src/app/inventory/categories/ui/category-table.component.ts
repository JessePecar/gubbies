import { Component, effect, inject, signal, untracked } from '@angular/core';
import {
  TableComponent,
  ToolbarItem,
} from '@/components/tables/table.component';
import { CategoryListService } from '@/inventory/categories/pages/list';
import { CategoryItemComponent } from './category-item.component';
import { UserInfoService } from '@/services';
import { PermissionEnum } from '@/entities/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-table',
  imports: [TableComponent, CategoryItemComponent],
  template: `
    <app-table [toolbarItems]="toolbarItems()">
      <div class="grid grid-cols-4">
        <div class="flex items-center h-full">
          <p>Category Code</p>
        </div>
        <div class="flex items-center h-full">
          <p>Category Name</p>
        </div>
      </div>
      @if (categoryListService.categories(); as categories) {
        @for (category of categories; track $index) {
          <category-item [category]="category" />
        }
      }
    </app-table>
  `,
  styles: ``,
})
export class CategoryTableComponent {
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
