import { inject } from '@angular/core';
import { UserInfoService } from './services';

export function initializeApp(): Promise<any> {
  // Do the initialization  of the code
  return loadFromLoader();
}

async function loadFromLoader() {
  await inject(UserInfoService).setupStore();
}
