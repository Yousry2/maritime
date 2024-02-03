import { Route } from '@angular/router';

export const appRoutes: Route[] = [
     {
          path: '',
          pathMatch: 'full',
          redirectTo: 'homepage',
     },

     {
          path: 'homepage',
          loadChildren: () => import('@maritime/feature-routes-map').then((m) => m.routeMapRoutes),
     },
];
