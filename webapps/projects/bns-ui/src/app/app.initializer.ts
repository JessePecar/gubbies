import { UserInfoService } from '@/bns-ui/common/services';
import { environment } from '@/bns:env/environment';
import { ApiSettingsService } from '@/core/requests';
import { inject } from '@angular/core';

export async function initializeApp() {
  // Do the initialization  of the code
  return await loadFromLoader();
}

async function loadFromLoader() {
  // Setting the api base url for the controller services
  const apiSettings = inject(ApiSettingsService);
  apiSettings.authApi.set(environment.authApi);
  apiSettings.bnsApi.set(environment.bnsApi);

  const userInfoService = inject(UserInfoService);
  await userInfoService.getStoredToken();
}
