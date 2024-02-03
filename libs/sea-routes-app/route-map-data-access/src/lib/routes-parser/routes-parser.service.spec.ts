import { TestBed } from '@angular/core/testing';

import { RoutesParserService } from './routes-parser.service';

describe('RoutesParserService', () => {
  let service: RoutesParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
