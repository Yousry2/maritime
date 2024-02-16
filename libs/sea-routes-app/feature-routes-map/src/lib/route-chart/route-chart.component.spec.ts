import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteChartComponent } from './route-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RouteChartComponent', () => {
     let component: RouteChartComponent;
     let fixture: ComponentFixture<RouteChartComponent>;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [RouteChartComponent, HttpClientTestingModule],
          }).compileComponents();

          fixture = TestBed.createComponent(RouteChartComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });
});
