import { TestBed } from '@angular/core/testing';

import { CreateDBService } from './create-db.service';

describe('CreateDBService', () => {
  let service: CreateDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
