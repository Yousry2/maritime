import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Route } from '@maritime/route-map-data-access';
import { convertTimeDifferenceToDate } from '@maritime/util-common';

/**
 * Represents a component that displays a summary of a route.
 *
 * @remarks
 * This component is used to display information about a route, including the average speed, travel time, and route name.
 *
 * @property {Input} route - An array of route objects to be displayed.
 * @property {Computed} averageSpeed - A computed property that calculates the average speed of the route.
 * @property {Computed} travelTime - A computed property that calculates the total travel time of the route.
 * @property {Computed} routeName - A computed property that generates the route name.
 *
 * @example
 * ```html
 * <maritime-route-summary [route]="selectedRoute()"></maritime-route-summary>
 * ```
 *
 */
@Component({
     selector: 'maritime-route-summary',
     standalone: true,
     imports: [CommonModule],
     templateUrl: './route-summary.component.html',
     styleUrl: './route-summary.component.scss',
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteSummaryComponent {
     constructor() {}
     route = input<Route[]>([]);

     averageSpeed = computed(() => {
          return (this.route().reduce((acc, cur) => acc + cur.points[0].speed, 0) / this.route().length).toFixed(2);
     });

     travelTime = computed(() => {
          const timeDifferenceInMilliseconds =
               this.route()[this.route().length - 1].points[0].leg_duration - this.route()[0].points[1].leg_duration;

          return convertTimeDifferenceToDate(timeDifferenceInMilliseconds);
     });
     routeName = computed(() => {
          return this.route()[0].from_port + '  to ' + this.route()[0].to_port;
     });
}
