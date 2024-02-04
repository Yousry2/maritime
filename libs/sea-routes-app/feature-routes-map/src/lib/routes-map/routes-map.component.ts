import { CommonModule } from '@angular/common';
import {
     AfterViewInit,
     ChangeDetectionStrategy,
     Component,
     Injector,
     ViewChild,
     computed,
     effect,
     inject,
     input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Route, RouteColor } from '@maritime/route-map-data-access';

@Component({
     selector: 'maritime-routes-map',
     standalone: true,
     imports: [CommonModule, GoogleMapsModule, FormsModule],
     templateUrl: './routes-map.component.html',
     styleUrl: './routes-map.component.scss',
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesMapComponent implements AfterViewInit {
     // input fields
     routes = input<Route[]>([]);

     @ViewChild('routeMap', { static: false }) googleMap?: GoogleMap;
     injector = inject(Injector);
     mapOptions: google.maps.MapOptions = {
          zoom: 11,
          streetViewControl: false,
          center: { lat: 25.2048, lng: 55.2708 },
     };

     ngAfterViewInit(): void {
          effect(
               () => {
                    if (this.polylineOptions() && this.polylineOptions().length > 0) {
                         const bounds = new google.maps.LatLngBounds();
                         this.polylineOptions().forEach((polyline) => {
                              bounds.extend(polyline.path[0]);
                              bounds.extend(polyline.path[1]);
                         });
                         this.googleMap?.fitBounds(bounds);
                    }
               },
               { injector: this.injector },
          );
     }

     polylineOptions = computed(() => {
          return this.routes().map((path) => ({
               ...path,

               path: [
                    new google.maps.LatLng(path.points[0]?.lat, path.points[0]?.lng),
                    new google.maps.LatLng(path.points[1]?.lat, path.points[1]?.lng),
               ],
               speed: path.points[0].speed,
               leg_duration: path.points[0].leg_duration,
               strokeColor:
                    path.points[0].speed > 20
                         ? RouteColor.GREEN
                         : path.points[0].speed > 15
                           ? RouteColor.BLUE
                           : path.points[0].speed > 10
                             ? RouteColor.YELLOW
                             : path.points[0].speed > 6
                               ? RouteColor.ORANE
                               : RouteColor.RED,
               strokeOpacity: 0.7,
               strokeWeight: 5,
          }));
     });
}
