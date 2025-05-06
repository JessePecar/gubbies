import { TableComponent, ToolbarItem } from '@/components/tables';
import { PermissionEnum } from '@/entities/role';
import { CategoryListService } from '@/inventory/categories/pages/list';
import { UserInfoService } from '@/services';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { SubcategoryItemComponent } from './subcategory-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategory-table',
  imports: [TableComponent, SubcategoryItemComponent],
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
      @if (categoryListService.subcategories(); as subcategories) {
        @for (subcategory of subcategories; track $index) {
          <subcategory-item [subcategory]="subcategory" />
        }
      }
    </app-table>
  `,
  styles: ``,
})
export class SubcategoryTableComponent {
  categoryListService = inject(CategoryListService);
  userInfoService = inject(UserInfoService);
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
              onClick: async () => this.onAddSubcategory(),
              text: 'Add Subcategory',
            },
          ]);
        } else {
          this.toolbarItems.set([]);
        }
      });
    });
  }

  async onAddSubcategory() {
    await this.router.navigate(['inventory', 'categories', 'create']);
  }
}
