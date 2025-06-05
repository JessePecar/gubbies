import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from './app.initializer';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { apolloProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(initializeApp),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideApollo(apolloProvider),
  ],
};
