import { TestBed } from '@angular/core/testing';

import { BatchLoadService } from './batch-load.service';

describe('BatchLoadService', () => {
  let service: BatchLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
