import { Injectable } from '@angular/core';
import { Route } from '../types/routes.model';

/**
 * RoutesParserService is a service class that provides methods for parsing and converting route information.
 */
@Injectable({
     providedIn: 'root',
})
export class RoutesParserService {
     constructor() {}

     /**
      * Parses the given route information and returns an array of Route objects.
      *
      * @param routeInfo - The route information to be parsed.
      * @returns An array of Route objects representing the parsed route information.
      */
     parseRouteInfo(routeInfo: string): Route[] {
          return routeInfo
               .split('\n')
               .slice(1, -1)
               .map((routeRow) => {
                    let routeAttributes: string[] = routeRow.split('","');
                    routeAttributes = routeAttributes.map((attr) => attr?.replaceAll('"', ''));
                    const route: Route = {
                         route_id: routeAttributes[0],
                         from_port: routeAttributes[1],
                         to_port: routeAttributes[2],
                         points: routeAttributes[4]?.split('], [').map((point) => {
                              const pointsAttributes = point?.replaceAll('[', '').replaceAll(']', '').split(',');
                              return {
                                   lat: Number(pointsAttributes[1]),
                                   lng: Number(pointsAttributes[0]),
                                   leg_duration: Number(pointsAttributes[2]),
                                   speed: Number.isNaN(Number(pointsAttributes[3])) ? 0 : Number(pointsAttributes[3]),
                              };
                         }),
                    };

                    return route;
               });
     }

     /**
      * Converts an array of Route objects into a Map of route IDs to an array of modified Route objects.
      *
      * @param routes - An array of Route objects to be converted.
      * @returns A Map object where each key is a route ID and the corresponding value is an array of modified path objects.
      */
     convertToMap(routes: Route[]): Map<string, Route[]> {
          return new Map(
               routes.map((i) => [
                    i.route_id,
                    i.points.map((point, index, arr) => ({
                         ...i,
                         points: [point, index < arr.length - 1 ? arr[index + 1] : point],
                    })),
               ]),
          );
     }
}
