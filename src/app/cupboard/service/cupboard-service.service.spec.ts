import { TestBed } from '@angular/core/testing';

import { CupboardServiceService } from './cupboard-service.service';

describe('CupboardServiceService', () => {
  let service: CupboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CupboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
