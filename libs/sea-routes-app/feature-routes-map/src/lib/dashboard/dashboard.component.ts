import { ChangeDetectionStrategy, Component, Inject, Signal, computed, signal } from '@angular/core';
import { APP_BASE_HREF, CommonModule, NgOptimizedImage, PlatformLocation } from '@angular/common';
import { RoutesMapComponent } from '../routes-map/routes-map.component';
import {
     PolylineOptions,
     Route,
     RoutesApiService,
     RoutesParserService,
     RouteColor,
} from '@maritime/route-map-data-access';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouteChartComponent } from '../route-chart/route-chart.component';
import { getBaseHref } from '@maritime/util-common';
@Component({
     selector: 'maritime-dashboard',
     standalone: true,
     imports: [CommonModule, RoutesMapComponent, RouteChartComponent, FormsModule, NgOptimizedImage],
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
     selectedRoute = signal('');
     routes$: Observable<Route[]> = this.routesApiService
          .requestRoutesInfo()
          .pipe(map((routeInfo) => this.routesParserService.parseRouteInfo(routeInfo)));

     polylineOptions$: Observable<Map<string, Route[]>> = this.routes$.pipe(
          map(
               (routes) =>
                    new Map(
                         routes.map((i) => [
                              i.route_id,
                              i.points.map((point, index, arr) => ({
                                   ...i,
                                   points: [point, index < arr.length - 1 ? arr[index + 1] : point],
                              })),
                         ]),
                    ),
          ),
     );

     polylineOptions2$: Observable<Map<string, PolylineOptions[]>> = this.polylineOptions$.pipe(
          map((routes) => {
               const polylineOptions: Map<string, PolylineOptions[]> = new Map();
               routes.forEach((subRoutes, key) => {
                    polylineOptions.set(
                         key,
                         subRoutes.map((path) => ({
                              ...path,

                              path: [
                                   new google.maps.LatLng(path.points[0]?.lat, path.points[0]?.lng),
                                   new google.maps.LatLng(path.points[1]?.lat, path.points[1]?.lng),
                              ],
                              speed: path.points[0].speed,
                              leg_duration: path.points[0].leg_duration,
                              strokeColor:
                                   path.points[0].speed > 15
                                        ? RouteColor.GREEN
                                        : path.points[0].speed > 10
                                          ? RouteColor.BLUE
                                          : path.points[0].speed > 6
                                            ? RouteColor.YELLOW
                                            : RouteColor.RED,
                              strokeOpacity: 0.5,
                              strokeWeight: 5,
                         })),
                    );
               });

               return polylineOptions;
          }),
     );

     selectedPolylineOptions = computed<PolylineOptions[]>(() => {
          return this.polylineOptions()?.get(this.selectedRoute()) ?? [];
     });

     routesList = computed(() => {
          return [...this.polylineOptions().values()].map((element) => {
               return {
                    route_id: element[0]?.route_id,
                    from_port: element[0]?.from_port,
                    to_port: element[0]?.to_port,
               };
          });
     });

     polylineOptions: Signal<Map<string, PolylineOptions[]>> = toSignal(this.polylineOptions2$, {
          initialValue: new Map(),
     });

     changeRoute(routeId: string) {
          this.selectedRoute.set(routeId);
     }
}
