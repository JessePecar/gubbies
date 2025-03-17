import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { Role } from '@/interfaces/settings/roles';
import { RoleItemComponent } from './role-item.component';
import { groupBy, mergeMap, of, toArray, zip } from 'rxjs';
import { UserDataService, UserInfoService } from '@/services';

type GroupedRole = {
  tierId: number;
  roles: Role[];
};

@Component({
  selector: 'app-role-list',
  imports: [TableComponent, RoleItemComponent],
  template: `<app-table [toolbarItems]="toolbarItems">
    @if (roles().length > 0) {
      @for (tier of roles(); track $index) {
        <div>
          <div
            class="p-4 w-full border-b border-stone-900 shadow-b bg-stone-900">
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
  </app-table>`,
  styles: ``,
})
export class RoleListComponent implements OnInit {
  roleListService = inject(RoleListService);
  userInfoService = inject(UserInfoService);
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
          console.log(groupedRoles);
          this.roles.set(groupedRoles);
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
        onClick: () => {},
      });
    }
  }
}
