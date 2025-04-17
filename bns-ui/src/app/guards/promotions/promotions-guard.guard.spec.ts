import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { promotionsGuardGuard } from './promotions-guard.guard';

describe('promotionsGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      promotionsGuardGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
