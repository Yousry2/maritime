import { TestBed } from '@angular/core/testing';

import { RoutesApiService } from './routes-api.service';

describe('RoutesApiService', () => {
  let service: RoutesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
