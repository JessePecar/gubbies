import { CanActivateChildFn } from '@angular/router';

export const inventoryGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
