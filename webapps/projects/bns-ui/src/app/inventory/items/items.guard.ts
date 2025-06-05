import { CanActivateFn } from '@angular/router';

export const itemsGuard: CanActivateFn = (route, state) => {
  return true;
};
