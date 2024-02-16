import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteSummaryComponent } from './route-summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RouteSummaryComponent', () => {
     let component: RouteSummaryComponent;
     let fixture: ComponentFixture<RouteSummaryComponent>;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [RouteSummaryComponent, HttpClientTestingModule],
          }).compileComponents();

          fixture = TestBed.createComponent(RouteSummaryComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });

     it('should calculate average speed', () => {
          fixture.componentRef.setInput('route', [
               { points: [{ speed: 10 }, { speed: 20 }] },
               { points: [{ speed: 30 }, { speed: 40 }] },
          ]);

          expect(component.averageSpeed()).toEqual('25.00');
     });

     it('should calculate travel time', () => {
          fixture.componentRef.setInput('route', [
               { points: [{ leg_duration: 1000 }, { leg_duration: 2000 }] },
               { points: [{ leg_duration: 3000 }, { leg_duration: 4000 }] },
          ]);
          expect(component.travelTime()).toEqual('00:01:00');
     });

     it('should update average speed and travel time', () => {
          fixture.componentRef.setInput('route', [
               { points: [{ speed: 10 }, { speed: 20 }] },
               { points: [{ speed: 30 }, { speed: 40 }] },
          ]);
          expect(component.averageSpeed()).toEqual('25.00');
          expect(component.travelTime()).toEqual('00:01:00');
     });

     it('should handle empty route array', () => {
          fixture.componentRef.setInput('route', []);
          expect(component.averageSpeed()).toEqual('NaN');
          expect(component.travelTime()).toEqual('Invalid Date');
     });

     it('should set the correct routeName with special characters in from_port and to_port', () => {
          fixture.componentRef.setInput('route', [
               { from_port: 'Port A!', to_port: 'Port B@' },
               { from_port: 'Port C#', to_port: 'Port D$' },
          ]);
          expect(component.routeName()).toEqual('Port A! to Port B@');
     });
});
