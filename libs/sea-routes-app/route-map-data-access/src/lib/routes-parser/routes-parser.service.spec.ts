import { TestBed } from '@angular/core/testing';

import { RoutesParserService } from './routes-parser.service';

describe('RoutesParserService', () => {
     let service: RoutesParserService;

     beforeEach(() => {
          TestBed.configureTestingModule({});
          service = TestBed.inject(RoutesParserService);
     });

     it('should be created', () => {
          expect(service).toBeTruthy();
     });

     // Should return an empty array when given an empty route information string
     it('should return an empty array when given an empty route information string', () => {
          const service = new RoutesParserService();
          const routeInfo = '';

          const parsedRoutes = service.parseRouteInfo(routeInfo);

          expect(parsedRoutes).toEqual([]);
     });

     // Should correctly parse a route information string with multiple routes
     it('should correctly parse a route information string with multiple routes', () => {
          const service = new RoutesParserService();
          const routeInfo =
               '"route_id","from_port","to_port","leg_duration","points"\n"1","Port A","Port B","877878","[[1,2,3,4],[5,6,7,8]]"\n"2","Port C","Port D","3223","[[9,10,11,12],[13,14,15,16]]"\n';

          const expectedRoutes = [
               {
                    route_id: '1',
                    from_port: 'Port A',
                    to_port: 'Port B',
                    points: [
                         { lat: 2, lng: 1, leg_duration: 3, speed: 4 },
                         { lat: 6, lng: 5, leg_duration: 7, speed: 8 },
                    ],
               },
               {
                    route_id: '2',
                    from_port: 'Port C',
                    to_port: 'Port D',
                    points: [
                         { lat: 10, lng: 9, leg_duration: 11, speed: 12 },
                         { lat: 14, lng: 13, leg_duration: 15, speed: 16 },
                    ],
               },
          ];

          const parsedRoutes = service.parseRouteInfo(routeInfo);

          expect(parsedRoutes).toEqual(expectedRoutes);
     });

     // Should correctly parse a route information string with missing speed and leg_duration fields
     it('should correctly parse a route information string with missing speed and leg_duration fields', () => {
          const service = new RoutesParserService();
          const routeInfo =
               '"route_id","from_port","to_port","leg_duration","points"\n"1","DEWVN","DEBRV","61904645","[[8.138572, 53.637016, 1498311135548, 11.2]]"\n';

          const expectedRoutes = [
               {
                    route_id: '1',
                    from_port: 'DEWVN',
                    to_port: 'DEBRV',
                    points: [{ lat: 53.637016, lng: 8.138572, leg_duration: 1498311135548, speed: 11.2 }],
               },
          ];

          const parsedRoutes = service.parseRouteInfo(routeInfo);

          expect(parsedRoutes).toEqual(expectedRoutes);
     });
});
