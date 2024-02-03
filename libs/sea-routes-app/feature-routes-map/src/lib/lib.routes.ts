import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routeMapRoutes: Route[] = [
     {
          path: '',
          component: DashboardComponent,
          // children: [
          //      { path: '', pathMatch: 'full', redirectTo: 'signup' },
          //      { path: 'signup', component: RoutesMapComponent },
          // ],
     },
];
