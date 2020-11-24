import { TestBed } from '@angular/core/testing';

import { RecipeSavedService } from './recipe-saved.service';

describe('RecipeSavedService', () => {
  let service: RecipeSavedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeSavedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
