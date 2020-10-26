import { TestBed } from '@angular/core/testing';

import { CookwareService } from './cookware.service';

describe('CookwareService', () => {
  let service: CookwareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookwareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
