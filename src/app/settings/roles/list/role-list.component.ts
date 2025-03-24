import { Component, computed, inject } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { Role } from '@/interfaces/settings/roles';
import { RoleItemComponent } from './role-item.component';
import { filter, map, merge, Observable, scan } from 'rxjs';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';
import { RoleSubscriptionService } from '../role-subscription.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-role-list',
  imports: [TableComponent, RoleItemComponent],
  template: `
    <app-table [toolbarItems]="toolbarItems()">
      <div class="h-full overflow-y-auto">
        @for (tier of roles(); track tier.tierId) {
          <div class="mb-1 px-1">
            <div
              class="p-4 w-full border-b border-stone-900 shadow-b bg-stone-400 text-stone-900 rounded-t">
              <p class="text-lg">Tier {{ tier.tierId }}</p>
            </div>
            <div class="shadow-inset px-4 py-1">
              @for (role of tier.roles; track $index) {
                <div
                  class="even:bg-stone-900 odd:border-1 odd:border-stone-900 bg-stone-800 border-stone-800 mb-1 rounded">
                  <role-item [role]="role" />
                </div>
              }
            </div>
          </div>
        } @empty {
          <div class="flex w-full justify-center items-cetner">
            <p>No roles found.</p>
          </div>
        }
      </div>
    </app-table>
  `,
})
export class RoleListComponent {
  private readonly router = inject(Router);
  private readonly userInfoService = inject(UserInfoService);
  private readonly roleListService = inject(RoleListService);
  private readonly roleSubService = inject(RoleSubscriptionService);

  protected readonly roles = toSignal(
    merge(this.getRoles(), this.onRoleUpdated()).pipe(
      scan((state, update) => {
        if (update instanceof Array) return update;
        const index = state.findIndex(role => role.id === update.id);
        if (index === -1) return [...state, update];
        return [...state.slice(0, index), update, ...state.slice(index + 1)];
      }, [] as Role[]),
      map(roles => {
        const groupedRoles = this.groupByHierarchyTier(roles);
        return this.sortByTierIdAsc(groupedRoles);
      })
    ),
    { initialValue: [] }
  );

  protected readonly toolbarItems = computed<ToolBarItem[]>(() => {
    const userInfo = this.userInfoService.userInfo();
    const hasCreateRole = userInfo?.role.rolePermissions.find(
      rp => rp.permissionId === 15
    );

    if (hasCreateRole) return [];
    return [
      {
        icon: 'add',
        text: 'Add Role',
        onClick: () => this.onCreateRole(),
      },
    ];
  });

  protected onCreateRole() {
    this.router.navigate(['/settings', 'roles', 'details']);
  }

  /**
   * Fetches roles from the RoleListService, groups them by hierarchy tier, and sorts them by tier ID in ascending order.
   *
   * @returns {Observable<GroupedRole[]>} An observable that emits an array of grouped and sorted roles.
   */
  private getRoles(): Observable<Role[]> {
    return this.roleListService.getRoles().pipe(map(({ data }) => data.roles));
  }

  private onRoleUpdated(): Observable<Role> {
    return this.roleSubService.subscribe().pipe(
      map(({ data }) => data?.roleUpdated),
      filter((role): role is Role => !!role)
    );
  }

  /**
   * Groups an array of Role objects by their hierarchyTier property.
   *
   * @param {Role[]} roles - An array of Role objects to be grouped by their hierarchyTier.
   * @returns {GroupedRole[]} An array of GroupedRole objects, each containing a tierId and an array of Role objects.
   */
  private groupByHierarchyTier(roles: Role[]): GroupedRole[] {
    return roles.reduce((collection, value) => {
      const entry = collection.find(v => v.tierId === value.hierarchyTier);
      if (entry) {
        entry.roles.push(value);
      } else {
        collection.push({ tierId: value.hierarchyTier, roles: [value] });
      }
      return collection;
    }, [] as GroupedRole[]);
  }

  /**
   * Sorts an array of GroupedRole objects in ascending order by their tierId property.
   *
   * @param {GroupedRole[]} groups - An array of GroupedRole objects to be sorted.
   * @returns {GroupedRole[]} The sorted array of GroupedRole objects.
   */
  private sortByTierIdAsc(groups: GroupedRole[]): GroupedRole[] {
    return groups.sort((a, b) => a.tierId - b.tierId);
  }
}

interface GroupedRole {
  tierId: number;
  roles: Role[];
}

interface ToolBarItem {
  icon: string;
  text: string;
  onClick: () => void;
}
