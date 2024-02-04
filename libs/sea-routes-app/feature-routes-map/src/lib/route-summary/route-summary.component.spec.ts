import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteSummaryComponent } from './route-summary.component';

describe('RouteSummaryComponent', () => {
     let component: RouteSummaryComponent;
     let fixture: ComponentFixture<RouteSummaryComponent>;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [RouteSummaryComponent],
          }).compileComponents();

          fixture = TestBed.createComponent(RouteSummaryComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });

     it('should calculate average speed', () => {
          component.route.set = [
            { points: [{ speed: 10 }, { speed: 20 }] },
            { points: [{ speed: 30 }, { speed: 40 }] },
          ];
          expect(component.averageSpeed()).toEqual('25.00');
     });

     it('should calculate travel time', () => {
          component.route = [
            { points: [{ leg_duration: 1000 }, { leg_duration: 2000 }] },
            { points: [{ leg_duration: 3000 }, { leg_duration: 4000 }] },
          ];
          expect(component.travelTime()).toEqual('00:01:00');
     });

     it('should update average speed and travel time', () => {
          component.route = [
            { points: [{ speed: 10 }, { speed: 20 }] },
            { points: [{ speed: 30 }, { speed: 40 }] },
          ];
          expect(component.averageSpeed()).toEqual('25.00');
          expect(component.travelTime()).toEqual('00:01:00');
     });

     it('should handle empty route array', () => {
          component.route = [];
          expect(component.averageSpeed()).toEqual('NaN');
          expect(component.travelTime()).toEqual('Invalid Date');
     });

     it('should emit newItemEvent when a new item is added to the route', () => {
          spyOn(component.newItemEvent, 'emit');
          const newItem = { points: [{ speed: 50 }, { speed: 60 }] };
          component.route.push(newItem);
          expect(component.newItemEvent.emit).toHaveBeenCalledWith(newItem);
     });

     it('should set the correct routeName with special characters in from_port and to_port', () => {
          component.route = [
            { from_port: 'Port A!', to_port: 'Port B@' },
            { from_port: 'Port C#', to_port: 'Port D$' },
          ];
          expect(component.routeName()).toEqual('Port A! to Port B@');
     });

     it('should calculate average speed with negative speed values', () => {
          component.route = [
            { points: [{ speed: -10 }, { speed: 20 }] },
            { points: [{ speed: 30 }, { speed: -40 }] },
          ];
          expect(component.averageSpeed()).toEqual('0.00');
     });

     it('should return invalid date with a single point in the route', () => {
          component.route = [
            { points: [{ leg_duration: 1000 }] },
          ];
          expect(component.travelTime()).toEqual('Invalid Date');
     });
});
