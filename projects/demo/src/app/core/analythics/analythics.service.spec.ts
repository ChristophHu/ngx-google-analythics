import { TestBed } from '@angular/core/testing';

import { AnalythicsService } from './analythics.service';

describe('AnalythicsService', () => {
  let service: AnalythicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalythicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
