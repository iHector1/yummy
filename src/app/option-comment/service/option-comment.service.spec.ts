import { TestBed } from '@angular/core/testing';

import { OptionCommentService } from './option-comment.service';

describe('OptionCommentService', () => {
  let service: OptionCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
