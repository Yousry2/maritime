import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
     providers: [
          provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withViewTransitions()),
          provideHttpClient(),
          provideAnimationsAsync(),
     ],
};
