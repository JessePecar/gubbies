import {
  afterRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import {
  TableComponent,
  ToolbarItem,
} from '@/core/components/tables/table.component';
import { CategoryListService } from '@/inventory/categories/pages/list';
import { CategoryItemComponent } from './category-item.component';
import { Router } from '@angular/router';
import { TextInputComponent } from '@/core/components/inputs';
import { Category } from '@/inventory/categories/interfaces';
import { SearchComponentBase } from '@/core/components/core';
import { UserInfoService } from '@/bns-ui/common/services';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-category-table',
  imports: [TableComponent, CategoryItemComponent, TextInputComponent],
  template: `
    <app-table [toolbarItems]="toolbarItems()">
      <div class="w-64" header>
        <app-text-input
          [inputProps]="{ placeholder: 'Search' }"
          (onChange)="onSearchChange($event)" />
      </div>
      @if (computedCategories().visibleCategories(); as categories) {
        @for (category of categories; track $index) {
          <category-item [category]="category" />
          <hr class="border-primary-dark" />
        }
      }
    </app-table>
  `,
  styles: ``,
})
export class CategoryTableComponent
  extends SearchComponentBase
  implements OnInit, OnDestroy
{
  userInfoService = inject(UserInfoService);
  categoryListService = inject(CategoryListService);
  router = inject(Router);

  toolbarItems = signal<ToolbarItem[]>([]);

  computedCategories = computed(() => ({
    categories: this.categoryListService.categories(),
    searchText: this.searchText(),
    visibleCategories: signal<Category[]>(
      this.searchText() !== null
        ? this.categoryListService
            .categories()
            .filter(
              cat =>
                cat.name
                  .toUpperCase()
                  .includes(this.searchText()!.toUpperCase()) ||
                cat.code.includes(this.searchText()!)
            )
        : this.categoryListService.categories()
    ),
  }));

  constructor(private elementRef: ElementRef) {
    super();
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

  ngOnInit(): void {
    this.categoryListService.loadCategories();
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  async onAddCategory() {
    await this.router.navigate(['inventory', 'categories', 'create']);
  }
}
