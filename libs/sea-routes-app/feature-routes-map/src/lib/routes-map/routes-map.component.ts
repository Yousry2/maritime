import { CommonModule } from '@angular/common';
import {
     AfterViewInit,
     ChangeDetectionStrategy,
     Component,
     Injector,
     ViewChild,
     effect,
     inject,
     input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { PolylineOptions, RoutesApiService, RoutesParserService } from '@maritime/route-map-data-access';

@Component({
     selector: 'maritime-routes-map',
     standalone: true,
     imports: [CommonModule, GoogleMapsModule, FormsModule],
     templateUrl: './routes-map.component.html',
     styleUrl: './routes-map.component.scss',
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesMapComponent implements AfterViewInit {
     @ViewChild('routeMap', { static: false }) googleMap?: GoogleMap;
     injector = inject(Injector);
     constructor(
          private routeApiServie: RoutesApiService,
          private routesParserService: RoutesParserService,
     ) {}

     mapOptions: google.maps.MapOptions = {
          zoom: 11,
          streetViewControl: false,
          center: { lat: 25.2048, lng: 55.2708 },
     };

     selectedPolylineOptions = input<PolylineOptions[]>([]);

     ngAfterViewInit(): void {
          effect(
               () => {
                    if (this.selectedPolylineOptions() && this.selectedPolylineOptions().length > 0) {
                         const bounds = new google.maps.LatLngBounds();
                         this.selectedPolylineOptions().forEach((polyline) => {
                              bounds.extend(polyline.path[0]);
                              bounds.extend(polyline.path[1]);
                         });
                         this.googleMap?.fitBounds(bounds);
                    }
               },
               { injector: this.injector },
          );
     }

     // polylineOptions2$: Observable<PolylineOptions[]> = this.polylineOptions$.pipe(
     //      map((routes) =>
     //           routes.map((route) => ({
     //                ...route,
     //                path: [
     //                     new google.maps.LatLng(route.points[0]?.lat, route.points[0]?.lng),
     //                     new google.maps.LatLng(route.points[1]?.lat, route.points[1]?.lng),
     //                ],
     //                strokeColor:
     //                     route.points[0].speed > 15
     //                          ? RouteColor.GREEN
     //                          : route.points[0].speed > 10
     //                            ? RouteColor.BLUE
     //                            : route.points[0].speed > 6
     //                              ? RouteColor.YELLOW
     //                              : RouteColor.RED,
     //                strokeOpacity: 0.5,
     //                strokeWeight: 5,
     //           })),
     //      ),
     // );

     // polylineOptions: Signal<PolylineOptions[]> = toSignal(this.polylineOptions2$, {
     //      initialValue: [],
     // });

     // selectedPolylineOptions = computed<PolylineOptions[]>(() => {
     //      return this.polylineOptions()?.filter((route) => route.route_id === this.selectedRoute()) ?? [];
     // });
}
