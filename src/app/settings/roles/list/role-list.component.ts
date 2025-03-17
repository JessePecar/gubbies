import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { Role } from '@/interfaces/settings/roles';
import { RoleItemComponent } from './role-item.component';
import { groupBy, mergeMap, of, toArray, zip } from 'rxjs';

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
        <div
          class="even:bg-stone-900 odd:border-1 odd:border-stone-900 bg-stone-800 border-stone-800 mb-1 rounded">
          <div
            class="p-4 w-full border-b border-stone-900 shadow-b bg-stone-900">
            <p class="text-lg">Tier {{ tier.tierId }}</p>
          </div>
          <div class="shadow-inset">
            @for (role of tier.roles; track $index) {
              <role-item [role]="role" />
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
  roles = signal<GroupedRole[]>([]);

  toolbarItems = [
    {
      icon: 'add',
      text: 'Add Role',
      onClick: () => {},
    },
    {
      icon: 'format_list_bulleted_add',
      text: 'Add Tier',
      onClick: () => {},
    },
  ];

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
  }
}
