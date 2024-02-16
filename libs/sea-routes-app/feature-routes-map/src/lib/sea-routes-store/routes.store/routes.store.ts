import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { tapResponse } from '@ngrx/component-store';
import { Route, RoutesApiService, RoutesParserService } from '@maritime/route-map-data-access';
import { computed, inject } from '@angular/core';
import { map, pipe, switchMap } from 'rxjs';

export interface RoutesStateInterface {
     routes: Map<string, Route[]>;
     selectedRouteId: string;
}

export const RouteStore = signalStore(
     { providedIn: 'root' },
     withState<RoutesStateInterface>({
          selectedRouteId: '',
          routes: new Map<string, Route[]>(),
     }),
     withComputed((store) => ({
          selectedRoute: computed(() => store.routes().get(store.selectedRouteId()) ?? []),
     })),
     withMethods(
          (store, routeApiService = inject(RoutesApiService), routesParserService = inject(RoutesParserService)) => ({
               getAllRoutes: rxMethod<void>(
                    pipe(
                         switchMap(() => routeApiService.requestRoutesInfo()),
                         map((routeInfo) => routesParserService.parseRouteInfo(routeInfo)),
                         map((routes) => routesParserService.convertToMap(routes)),
                         tapResponse({
                              next: (items) => patchState(store, { routes: items }),
                              error: console.error,
                         }),
                    ),
               ),
          }),
     ),
     withHooks({
          onInit({ getAllRoutes }) {
               getAllRoutes();
          },
     }),
);
