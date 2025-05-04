import { TableComponent, ToolbarItem } from '@/components/tables';
import { PermissionEnum } from '@/entities/role';
import { CategoryListService } from '@/inventory/categories/pages/list/category-list.service';
import { UserInfoService } from '@/services';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { CategoryItemComponent } from '@/inventory/categories/ui/';
import { Router } from '@angular/router';
import { TabContainerComponent, TabComponent } from '@/components/tab';

@Component({
  selector: 'app-category-list',
  imports: [
    TableComponent,
    CategoryItemComponent,
    TabContainerComponent,
    TabComponent,
  ],
  template: `
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-3/4">
        <app-tab-container>
          <app-tab title="Categories">
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
          </app-tab>
          <app-tab title="Subcategories">
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
          </app-tab>
          <app-tab title="Families">
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
          </app-tab>
        </app-tab-container>
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
