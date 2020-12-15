import { TestBed } from '@angular/core/testing';

import { SearchRecipesService } from './search-recipes.service';

describe('SearchRecipesService', () => {
  let service: SearchRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
