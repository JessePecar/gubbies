import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { Role } from '@/interfaces/settings/roles';
import { RoleItemComponent } from './role-item.component';
import { groupBy, mergeMap, of, toArray, zip } from 'rxjs';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';

type GroupedRole = {
  tierId: number;
  roles: Role[];
};

@Component({
  selector: 'app-role-list',
  imports: [TableComponent, RoleItemComponent],
  template: `<app-table [toolbarItems]="toolbarItems">
    <div class="h-full overflow-y-auto">
      @if (roles().length > 0) {
        @for (tier of roles(); track $index) {
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
        }
      } @else {
        <div class="flex w-full justify-center items-cetner">
          <p>No roles found.</p>
        </div>
      }
    </div>
  </app-table>`,
  styles: ``,
})
export class RoleListComponent implements OnInit {
  roleListService = inject(RoleListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  roles = signal<GroupedRole[]>([]);

  toolbarItems: { icon: string; text: string; onClick: () => void }[] = [];

  ngOnInit(): void {
    var groupedRoles: GroupedRole[] = [];
    this.roleListService.getRoles().subscribe(({ data: roles }) => {
      of(roles)
        .pipe(
          mergeMap(obs => {
            return obs.roles;
          }),
          groupBy(role => role.hierarchyTier, {
            element: role => role,
          }),
          mergeMap(group => zip(of(group.key), group.pipe(toArray())))
        )
        .subscribe(res => {
          groupedRoles.push({
            roles: res[1],
            tierId: res[0],
          });
        })
        .add(() => {
          this.roles.set(
            // Add the grouped roles sorted by tierId descending
            groupedRoles.sort((a, b) => a.tierId - b.tierId)
          );
        });
    });

    if (
      this.userInfoService
        .userInfo()
        ?.role.rolePermissions.find(rp => rp.permissionId === 15)
    ) {
      this.toolbarItems.push({
        icon: 'add',
        text: 'Add Role',
        onClick: () => this.onCreateRole(),
      });
    }
  }

  onCreateRole() {
    this.router.navigate(['settings/roles/details']);
  }
}
