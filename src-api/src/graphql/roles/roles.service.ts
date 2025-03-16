import { Injectable } from '@angular/core';
import { RepositoryService } from 'src/repository';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private readonly repository: RepositoryService) {}

  getRoles() {
    return this.repository.roles.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  getRole(id: number) {
    return this.repository.roles.findFirst({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
      where: {
        id: {
          equals: id,
        },
      },
    });
  }
}
