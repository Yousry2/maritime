import { APP_BASE_HREF, CommonModule, NgOptimizedImage, PlatformLocation } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getBaseHref } from '@maritime/util-common';
import { RouteChartComponent } from '../route-chart/route-chart.component';
import { RouteSummaryComponent } from '../route-summary/route-summary.component';
import { RoutesMapComponent } from '../routes-map/routes-map.component';
import { RouteStore } from '../sea-routes-store/routes.store/routes.store';
import { patchState } from '@ngrx/signals';

/**
 * The DashboardComponent class represents the main component of the dashboard module.
 * It is responsible for displaying and managing the dashboard view, including the route map, route chart, and route summary components.
 *
 * @property {string} selectedRouteId - The ID of the currently selected route.
 * @property {Observable<Route[]>} routesArr$ - An observable of the list of routes after parsing the route info.
 * @property {Map<string, Route[]>} routes - A map of routes, keyed by route ID.
 * @property {{string, string, string}[]>} routeNamesList - list of route names to be displayed in the dropdown.
 * @property {Route[]} selectedRoute - The currently selected route.
 *
 * @method changeRoute - Changes the currently selected route.
 */
@Component({
     selector: 'maritime-dashboard',
     standalone: true,
     imports: [
          CommonModule,
          RoutesMapComponent,
          RouteChartComponent,
          RouteSummaryComponent,
          FormsModule,
          NgOptimizedImage,
     ],
     providers: [
          {
               provide: APP_BASE_HREF,
               useFactory: getBaseHref,
               deps: [PlatformLocation],
          },
     ],
     templateUrl: './dashboard.component.html',
     styleUrl: './dashboard.component.scss',
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
     constructor(@Inject(APP_BASE_HREF) public baseHref: string) {}

     routeStore = inject(RouteStore);
     selectedRouteId = this.routeStore.selectedRouteId;

     routes = this.routeStore.routes;

     selectedRoute = this.routeStore.selectedRoute;

     /**
      * @property {{string, string, string[]>} routeNamesList - list of route names to be displayed in the dropdown.
      */

     routesNamesList = computed(() => {
          return [...this.routes().values()].map((element) => {
               return {
                    route_id: element[0]?.route_id,
                    from_port: element[0]?.from_port,
                    to_port: element[0]?.to_port,
               };
          });
     });

     /**
      * @method changeRoute
      * @description Changes the currently selected route.
      * @param {string} routeId - The ID of the route to select.
      */ changeRoute(routeId: string) {
          patchState(this.routeStore, { selectedRouteId: routeId });
     }
}
