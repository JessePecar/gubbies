import { ToolbarItem } from '@/core/components/tables';
import { CategoryListService } from '@/inventory/categories/pages/list';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@/core/components/tables';
import { FamilyItemComponent } from './family-item.component';
import { TextInputComponent } from '@/core/components';
import { SearchComponentBase } from '@/core/components/core';
import { Family } from '@/inventory/categories/interfaces';
import { UserInfoService } from '@/core/services/user';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-family-table',
  imports: [TableComponent, FamilyItemComponent, TextInputComponent],
  template: `<app-table [toolbarItems]="toolbarItems()">
    <div class="w-64" header>
      <app-text-input
        [inputProps]="{ placeholder: 'Search' }"
        (onChange)="onSearchChange($event)" />
    </div>
    @if (computedFamilies().visibleFamilies(); as families) {
      @for (family of families; track $index) {
        <family-item [family]="family" />
        <hr class="border-primary-dark" />
      }
    }
  </app-table>`,
  styles: ``,
})
export class FamilyTableComponent extends SearchComponentBase {
  categoryListService = inject(CategoryListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  toolbarItems = signal<ToolbarItem[]>([]);

  computedFamilies = computed(() => ({
    families: this.categoryListService.families(),
    searchText: this.searchText(),
    visibleFamilies: signal<Family[]>(
      this.searchText() !== null
        ? this.categoryListService
            .families()
            .filter(
              fam =>
                fam.name
                  .toUpperCase()
                  .includes(this.searchText()!.toUpperCase()) ||
                fam.code.includes(this.searchText()!.toUpperCase())
            )
        : this.categoryListService.families()
    ),
  }));

  constructor() {
    super();
    this.categoryListService.loadFamilies();
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
