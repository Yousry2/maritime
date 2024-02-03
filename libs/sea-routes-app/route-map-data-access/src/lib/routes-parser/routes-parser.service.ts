import { Injectable } from '@angular/core';
import { Route } from '../types/routes.model';

@Injectable({
     providedIn: 'root',
})
export class RoutesParserService {
     constructor() {}

     parseRouteInfo(routeInfo: string): Route[] {
          return routeInfo
               .split('\n')
               .slice(1, -1)
               .map((routeRaw) => {
                    let routeAttributes: string[] = routeRaw.split('","');
                    routeAttributes = routeAttributes.map((attr) => attr?.replaceAll('"', ''));
                    const route: Route = {
                         route_id: routeAttributes[0],
                         from_port: routeAttributes[1],
                         to_port: routeAttributes[2],
                         speed: Number.isNaN(Number(routeAttributes[3])) ? 0 : Number(routeAttributes[3]),
                         leg_duration: Number.isNaN(Number(routeAttributes[2])) ? 0 : Number(routeAttributes[2]),
                         points: routeAttributes[4]?.split('], [').map((point) => {
                              const pointsAttributes = point?.replaceAll('[', '').replaceAll(']', '').split(',');
                              return {
                                   lat: Number(pointsAttributes[1]),
                                   lng: Number(pointsAttributes[0]),
                                   leg_duration: Number(pointsAttributes[2]),
                                   speed: Number(pointsAttributes[3]),
                              };
                         }),
                    };

                    return route;
               });
     }
}
