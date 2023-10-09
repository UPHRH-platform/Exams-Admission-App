import { TestBed } from '@angular/core/testing';

import { FeeManagementService } from './fee-management.service';

describe('FeeManagementService', () => {
  let service: FeeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
