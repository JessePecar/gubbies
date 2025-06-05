import { inject, Injectable, signal } from '@angular/core';
import { GetRolesService, RoleSubscriptionService } from '@/settings/roles';
import { Role } from '@/models/auth/role';

type GroupedRole = {
  tierId: number;
  roles: Role[];
};

@Injectable({
  providedIn: 'root',
})
export class RoleListService {
  private readonly getRolesService = inject(GetRolesService);
  private readonly roleSubService = inject(RoleSubscriptionService);

  private rawRoles = signal<Role[]>([]);
  public roles = signal<GroupedRole[]>([]);

  constructor() {
    this.getRoles();

    this.roleSubService.subscribe().subscribe(({ data }) => {
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

  getRoles() {
    return this.getRolesService
      .watch()
      .valueChanges.subscribe(({ data: { roles } }) => {
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
}
