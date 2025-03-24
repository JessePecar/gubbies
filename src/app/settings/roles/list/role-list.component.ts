import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleListService } from './role-list.service';
import { TableComponent } from '@/components/tables/table.component';
import { Role } from '@/interfaces/settings/roles';
import { RoleItemComponent } from './role-item.component';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';
import { RoleSubscriptionService } from '../role-subscription.service';
import { JsonPipe } from '@angular/common';

type GroupedRole = {
  tierId: number;
  roles: Role[];
};

@Component({
  selector: 'app-role-list',
  imports: [TableComponent, RoleItemComponent],
  template: `<app-table [toolbarItems]="toolbarItems">
    <div class="h-full overflow-y-auto">
      @if (roles(); as roles) {
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
        } @empty {
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
        var rawRoles = this.rawRoles();
        var roleIndex = rawRoles.findIndex(rr => rr.id === data.roleUpdated.id);
        if (roleIndex !== -1) {
          rawRoles[roleIndex] = data.roleUpdated;
        } else {
          rawRoles.push(data.roleUpdated);
          rawRoles = rawRoles.sort((a, b) => a.hierarchyTier - b.hierarchyTier);
        }

        this.rawRoles.set(rawRoles);
        this.groupRoles();
      }
    });
  }

  rawRoles = signal<Role[]>([]);
  roles = signal<GroupedRole[]>([]);

  toolbarItems: { icon: string; text: string; onClick: () => void }[] = [];

  getRoles() {
    this.roleListService.getRoles().subscribe(({ data: { roles } }) => {
      this.rawRoles.set(roles);
      this.groupRoles();
    });
  }

  groupRoles() {
    let groupedRoles: GroupedRole[] = [];
    var rawRoles = [...this.rawRoles()];
    rawRoles
      .sort((a, b) => a.hierarchyTier - b.hierarchyTier)
      .reduce<GroupedRole[]>((collection, value) => {
        // If the item exists in the collection, add the role
        var collectionIndex = collection.findIndex(
          c => c.tierId === value.hierarchyTier
        );

        if (collectionIndex !== -1) {
          collection[collectionIndex].roles.push(value);
        } else {
          collection.push({
            tierId: value.hierarchyTier,
            roles: [value],
          });
        }
        return collection;
      }, groupedRoles);

    console.log(groupedRoles);
    this.roles.set(groupedRoles);
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
