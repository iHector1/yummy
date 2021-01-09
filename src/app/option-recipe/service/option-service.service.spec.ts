import { TestBed } from '@angular/core/testing';

import { OptionServiceService } from './option-service.service';

describe('OptionServiceService', () => {
  let service: OptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
