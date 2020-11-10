import { TestBed } from '@angular/core/testing';

import { SuperlistService } from './superlist.service';

describe('SuperlistService', () => {
  let service: SuperlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
