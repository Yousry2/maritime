import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';
import { Route } from '@maritime/route-map-data-access';
import { convertTimeDifferenceToDate } from '@maritime/util-common';

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
     @Output() newItemEvent = new EventEmitter();

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
