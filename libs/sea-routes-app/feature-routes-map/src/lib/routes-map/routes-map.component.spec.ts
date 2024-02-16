import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesMapComponent } from './routes-map.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoutesMapComponent', () => {
     let component: RoutesMapComponent;
     let fixture: ComponentFixture<RoutesMapComponent>;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [RoutesMapComponent, HttpClientTestingModule],
          }).compileComponents();

          fixture = TestBed.createComponent(RoutesMapComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });
});
