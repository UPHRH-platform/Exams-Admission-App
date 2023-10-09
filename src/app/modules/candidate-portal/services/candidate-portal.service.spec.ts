import { TestBed } from '@angular/core/testing';

import { CandidatePortalService } from './candidate-portal.service';

describe('CandidatePortalService', () => {
  let service: CandidatePortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatePortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
