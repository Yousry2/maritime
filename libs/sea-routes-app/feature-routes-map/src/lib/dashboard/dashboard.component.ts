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

     routes$: Observable<Map<string, Route[]>> = this.routesArr$.pipe(
          map((routes) => this.routesParserService.convertToMap(routes)),
     );

     routes = toSignal(this.routes$, { initialValue: new Map() });

     selectedRoute = computed(() => {
          return this.routes()?.get(this.selectedRouteId()) ?? [];
     });

     routesNamesList = computed(() => {
          return [...this.routes().values()].map((element) => {
               return {
                    route_id: element[0]?.route_id,
                    from_port: element[0]?.from_port,
                    to_port: element[0]?.to_port,
               };
          });
     });

     changeRoute(routeId: string) {
          this.selectedRouteId.set(routeId);
     }
}
