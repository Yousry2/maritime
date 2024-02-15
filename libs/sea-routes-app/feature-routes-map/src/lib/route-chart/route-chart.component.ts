import { CommonModule } from '@angular/common';
import {
     AfterViewInit,
     ChangeDetectionStrategy,
     Component,
     Injector,
     computed,
     effect,
     inject,
     input,
} from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Route } from '@maritime/route-map-data-access';

/**
 * Represents a component that displays a chart of route speeds.
 *
 * @remarks
 * This component is used to visualize the speeds of the routes on several points on a line chart using chartjs library.
 *
 * @example
 * ```html
 * <maritime-route-chart [route]="route"></maritime-route-chart>
 * ```
 *
 * @property {Route[]} route - An input property that accepts an array of Route objects.
 * @property {object} chartOptions - A computed property that returns the configuration options for the chart.
 *
 * @publicApi
 */
@Component({
     selector: 'maritime-route-chart',
     standalone: true,
     imports: [CommonModule, CanvasJSAngularChartsModule],
     templateUrl: './route-chart.component.html',
     styleUrl: './route-chart.component.scss',
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteChartComponent implements AfterViewInit {
     route = input<Route[]>([]);
     chart: any;
     injector = inject(Injector);

     ngAfterViewInit() {
          effect(
               () => {
                    this.chartOptions();
                    this.chart.render();
               },
               { injector: this.injector },
          );
     }
     getChartInstance(chart: object) {
          this.chart = chart;
     }

     chartOptions = computed(() => {
          return {
               animationEnabled: true,
               animationDuration: 2000,
               theme: 'dark2',
               backgroundColor: '#0C4A6E',
               colorSet: ['#FFFFFF'],
               title: {
                    text: 'Route Speed Chart',
                    fontFamily: '"LIBRE", "sans-serif"',
               },
               axisY: {
                    title: 'Speed in knots',
               },
               data: [
                    {
                         type: 'spline',
                         xValueFormatString: 'YYYY/MM/DD HH:mm:ss',
                         yValueFormatString: "#,###.##' Knots/Hour'",

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
