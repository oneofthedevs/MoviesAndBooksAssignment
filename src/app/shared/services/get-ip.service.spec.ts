import { TestBed } from '@angular/core/testing';

import { GetIPService } from './get-ip.service';

describe('GetIPService', () => {
  let service: GetIPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetIPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
