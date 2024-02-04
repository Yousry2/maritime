import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, computed, input, signal } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Route } from '@maritime/route-map-data-access';

@Component({
     selector: 'maritime-route-chart',
     standalone: true,
     imports: [CommonModule, CanvasJSAngularChartsModule],
     templateUrl: './route-chart.component.html',
     styleUrl: './route-chart.component.scss',
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteChartComponent {
     route = input<Route[]>([]);
     chart: WritableSignal<any> = signal('MyChart', {});

     chartOptions = computed(() => {
          return {
               animationEnabled: true,
               animationDuration: 2000,
               title: {
                    text: 'Route Speed Chart',
                    fontFamily: '"LIBRE", "sans-serif"',
                    fontWeight: 'bold',
               },
               axisY: {
                    title: 'Speed in knots',
               },
               data: [
                    {
                         type: 'spline',
                         xValueFormatString: 'YYYY',
                         yValueFormatString: "#,###.##'%'",

                         dataPoints: this.route().map((path) => {
                              return {
                                   x: new Date(path.points[0].leg_duration),
                                   y: path.points[0].speed,
                              };
                         }),
                    },
               ],
          };
     });
}
