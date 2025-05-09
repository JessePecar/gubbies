import { ToolbarItem } from '@/components/tables';
import { PermissionEnum } from '@/entities/role';
import { CategoryListService } from '@/inventory/categories/pages/list';
import { UserInfoService } from '@/services';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@/components/tables/table.component';
import { FamilyItemComponent } from './family-item.component';

@Component({
  selector: 'app-family-table',
  imports: [TableComponent, FamilyItemComponent],
  template: `<app-table [toolbarItems]="toolbarItems()">
    @if (categoryListService.families(); as families) {
      @for (family of families; track $index) {
        <family-item [family]="family" />
      }
    }
  </app-table>`,
  styles: ``,
})
export class FamilyTableComponent {
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
              onClick: async () => this.onAddFamily(),
              text: 'Add Family',
            },
          ]);
        } else {
          this.toolbarItems.set([]);
        }
      });
    });
  }

  async onAddFamily() {
    await this.router.navigate(['inventory', 'categories', 'create', 'family']);
  }
}
