import { TestBed } from '@angular/core/testing';

import { PlanServiceService } from './plan-service.service';

describe('PlanServiceService', () => {
  let service: PlanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
