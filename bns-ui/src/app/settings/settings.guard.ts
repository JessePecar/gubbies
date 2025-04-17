import { CanActivateChildFn } from '@angular/router';

export const settingsGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
