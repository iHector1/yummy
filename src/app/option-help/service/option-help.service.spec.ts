import { TestBed } from '@angular/core/testing';

import { OptionHelpService } from './option-help.service';

describe('OptionHelpService', () => {
  let service: OptionHelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
