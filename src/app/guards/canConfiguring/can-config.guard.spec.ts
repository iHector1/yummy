import { TestBed } from '@angular/core/testing';

import { CanConfigGuard } from './can-config.guard';

describe('CanConfigGuard', () => {
  let guard: CanConfigGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanConfigGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
