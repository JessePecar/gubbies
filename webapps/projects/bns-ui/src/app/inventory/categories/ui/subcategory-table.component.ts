import { TableComponent, ToolbarItem } from '@/core/components/tables';
import { CategoryListService } from '@/inventory/categories/pages/list';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { SubcategoryItemComponent } from './subcategory-item.component';
import { Router } from '@angular/router';
import { SearchComponentBase } from '@/core/components/core';
import { Subcategory } from '@/inventory/categories/interfaces';
import { TextInputComponent } from '@/core/components';
import { UserInfoService } from '@/core/services/user';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-subcategory-table',
  imports: [TableComponent, SubcategoryItemComponent, TextInputComponent],
  template: `
    <app-table [toolbarItems]="toolbarItems()">
      <div class="w-64" header>
        <app-text-input
          [inputProps]="{ placeholder: 'Search' }"
          (onChange)="onSearchChange($event)" />
      </div>
      @if (computedSubcategories().visibleSubcategories(); as subcategories) {
        @for (subcategory of subcategories; track $index) {
          <subcategory-item [subcategory]="subcategory" />
          <hr class="border-primary-dark" />
        }
      }
    </app-table>
  `,
  styles: ``,
})
export class SubcategoryTableComponent extends SearchComponentBase {
  categoryListService = inject(CategoryListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  toolbarItems = signal<ToolbarItem[]>([]);

  computedSubcategories = computed(() => ({
    subcategories: this.categoryListService.subcategories(),
    searchText: this.searchText(),
    visibleSubcategories: signal<Subcategory[]>(
      this.searchText() !== null
        ? this.categoryListService
            .subcategories()
            .filter(
              subcat =>
                subcat.name
                  .toUpperCase()
                  .includes(this.searchText()!.toUpperCase()) ||
                subcat.code.includes(this.searchText()!.toUpperCase())
            )
        : this.categoryListService.subcategories()
    ),
  }));

  constructor() {
    super();
    this.categoryListService.loadSubcategories();
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
    await this.router.navigate([
      'inventory',
      'categories',
      'create',
      'subcategory',
    ]);
  }
}
