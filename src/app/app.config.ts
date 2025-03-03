import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from './app.initializer';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(initializeApp),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
};
