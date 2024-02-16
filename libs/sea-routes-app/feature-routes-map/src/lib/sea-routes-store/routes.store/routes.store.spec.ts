import { TestBed } from '@angular/core/testing';

import { RouteStore } from './routes.store';

describe('RoutesStore', () => {
     let store: RouteStore;

     beforeEach(() => {
          TestBed.configureTestingModule({});
          store = TestBed.inject(RouteStore);
     });

     it('should be created', () => {
          expect(store).toBeTruthy();
     });
});
