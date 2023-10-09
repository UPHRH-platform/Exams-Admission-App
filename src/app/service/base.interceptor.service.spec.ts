import { TestBed } from '@angular/core/testing';

import { BaseInterceptorService } from './base.interceptor.service';

describe('BaseInterceptorService', () => {
  let service: BaseInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
