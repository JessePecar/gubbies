import { UserInfoService } from '@/core/services/user';
import { inject } from '@angular/core';

export async function initializeApp() {
  // Do the initialization  of the code
  return await loadFromLoader();
}

async function loadFromLoader() {
  return await inject(UserInfoService).getStoredToken();
}
