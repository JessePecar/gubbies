import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { Role } from '@/interfaces/settings/roles';
import { RoleItemComponent } from './role-item.component';
import { groupBy, map, mergeMap, of, toArray, zip } from 'rxjs';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';
import { RoleSubscriptionService } from '../role-subscription.service';
import { JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

type GroupedRole = {
  tierId: number;
  roles: Role[];
};

@Component({
  selector: 'app-role-list',
  imports: [TableComponent, RoleItemComponent, JsonPipe],
  template: `<app-table [toolbarItems]="toolbarItems">
    <div class="h-full overflow-y-auto">
      @if (rolesV2(); as roles) {
        {{ roles | json }}
        @if (roles.length > 0) {
          @for (tier of roles; track tier.tierId) {
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
      }
    </div>
  </app-table>`,
  styles: ``,
})
export class RoleListComponent implements OnInit {
  roleListService = inject(RoleListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  constructor(private roleSubService: RoleSubscriptionService) {
    // Subscribe to changes
    this.getRoles();

    roleSubService.subscribe().subscribe(({ data }) => {
      if (data && data.roleUpdated) {
        // this.getRoles();
        var groupedTier = this.roles().find(
          r => r.tierId === data.roleUpdated.hierarchyTier
        );
        // If the tier exists, then we will add/update to the tier
        if (groupedTier) {
          if (groupedTier.roles.find(role => role.id === data.roleUpdated.id)) {
            groupedTier.roles = groupedTier.roles.map(role => {
              if (role.id === data.roleUpdated.id) return data.roleUpdated;
              return role;
            });
          } else {
            groupedTier.roles.push(data.roleUpdated);
          }

          var updatedRoles = this.roles().map(r => {
            if (r.tierId === groupedTier!.tierId) {
              return groupedTier!;
            }
            return r;
          });

          this.roles.set([...updatedRoles]);

          console.log(this.roles());
        }
        // Else, we refetch which will do the sorting that we want as well
        else {
          this.getRoles();
        }
      }
    });
  }

  roles = signal<GroupedRole[]>([]);
  rolesV2 = toSignal(
    inject(RoleSubscriptionService)
      .subscribe()
      .pipe(
        map(({ data }) => {
          if (data && data.roleUpdated) {
            // this.getRoles();
            var groupedTier = this.roles().find(
              r => r.tierId === data.roleUpdated.hierarchyTier
            );
            // If the tier exists, then we will add/update to the tier
            if (groupedTier) {
              if (
                groupedTier.roles.find(role => role.id === data.roleUpdated.id)
              ) {
                groupedTier.roles = groupedTier.roles.map(role => {
                  if (role.id === data.roleUpdated.id) return data.roleUpdated;
                  return role;
                });
              } else {
                groupedTier.roles.push(data.roleUpdated);
              }

              var updatedRoles = this.roles().map(r => {
                if (r.tierId === groupedTier!.tierId) {
                  return groupedTier!;
                }
                return r;
              });

              return [...updatedRoles];
            }
            // Else, we refetch which will do the sorting that we want as well
            else {
              return this.getRoles();
            }
          }

          return this.roles();
        })
      )
  );
  toolbarItems: { icon: string; text: string; onClick: () => void }[] = [];

  getRoles() {
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

    return this.roles();
  }

  ngOnInit(): void {
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
