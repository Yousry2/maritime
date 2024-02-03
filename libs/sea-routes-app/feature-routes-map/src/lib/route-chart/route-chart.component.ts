import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, computed, input, signal } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PolylineOptions } from '@maritime/route-map-data-access';

@Component({
     selector: 'maritime-route-chart',
     standalone: true,
     imports: [CommonModule, CanvasJSAngularChartsModule],
     templateUrl: './route-chart.component.html',
     styleUrl: './route-chart.component.scss',
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteChartComponent {
     selectedPolylineOptions = input<PolylineOptions[]>([]);
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

                         dataPoints: this.selectedPolylineOptions().map((polylineOptions) => {
                              return {
                                   x: new Date(polylineOptions.leg_duration),
                                   y: polylineOptions.speed,
                              };
                         }),
                    },
               ],
          };
     });
}
