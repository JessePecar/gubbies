import { CanActivateChildFn } from '@angular/router';

export const usersGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
