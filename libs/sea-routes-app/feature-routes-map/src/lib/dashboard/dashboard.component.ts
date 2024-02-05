import { APP_BASE_HREF, CommonModule, NgOptimizedImage, PlatformLocation } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Route, RoutesApiService, RoutesParserService } from '@maritime/route-map-data-access';
import { getBaseHref } from '@maritime/util-common';
import { Observable, map } from 'rxjs';
import { RouteChartComponent } from '../route-chart/route-chart.component';
import { RouteSummaryComponent } from '../route-summary/route-summary.component';
import { RoutesMapComponent } from '../routes-map/routes-map.component';

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
     constructor(
          private routesApiService: RoutesApiService,
          private routesParserService: RoutesParserService,
          @Inject(APP_BASE_HREF) public baseHref: string,
     ) {}

     selectedRouteId = signal('');

     routesArr$: Observable<Route[]> = this.routesApiService
          .requestRoutesInfo()
          .pipe(map((routeInfo) => this.routesParserService.parseRouteInfo(routeInfo)));

     routes = toSignal(this.routesArr$.pipe(map((routes) => this.routesParserService.convertToMap(routes))), {
          initialValue: new Map(),
     });

     selectedRoute = computed(() => {
          return this.routes()?.get(this.selectedRouteId()) ?? [];
     });

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
          this.selectedRouteId.set(routeId);
     }
}
