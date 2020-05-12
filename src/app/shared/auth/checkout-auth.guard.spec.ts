import { TestBed } from '@angular/core/testing';

import { CheckoutAuthGuard } from './checkout-auth.guard';

describe('CheckoutAuthGuard', () => {
  let guard: CheckoutAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckoutAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
