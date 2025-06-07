import { environment } from "@/portal:env/environment";
import {ApiSettingsService} from '@/core/requests'
import { inject } from "@angular/core";

export async function initializeApp() {
  // Do the initialization  of the code
  return await loadFromLoader();
}

async function loadFromLoader() {
  // Setting the api base url for the controller services
  const apiSettings = inject(ApiSettingsService);
  apiSettings.authApi.set(environment.authApi);
}
