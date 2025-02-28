import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pricingGuard } from './pricing.guard';

describe('pricingGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => pricingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
