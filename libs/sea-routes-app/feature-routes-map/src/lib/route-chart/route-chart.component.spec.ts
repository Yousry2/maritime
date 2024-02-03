import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteChartComponent } from './route-chart.component';

describe('RouteChartComponent', () => {
     let component: RouteChartComponent;
     let fixture: ComponentFixture<RouteChartComponent>;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [RouteChartComponent],
          }).compileComponents();

          fixture = TestBed.createComponent(RouteChartComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });
});
