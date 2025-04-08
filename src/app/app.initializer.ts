import { inject } from '@angular/core';
import { UserInfoService } from './services';

export async function initializeApp() {
  // Do the initialization  of the code
  return await loadFromLoader();
}

async function loadFromLoader() {
  return await inject(UserInfoService).getStoredToken();
}
