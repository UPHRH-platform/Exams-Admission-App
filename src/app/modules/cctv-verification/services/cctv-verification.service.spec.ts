import { TestBed } from '@angular/core/testing';

import { CctvVerificationService } from './cctv-verification.service';

describe('CctvVerificationService', () => {
  let service: CctvVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CctvVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
