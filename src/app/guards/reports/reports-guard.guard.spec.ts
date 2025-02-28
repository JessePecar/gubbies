import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { reportsGuardGuard } from './reports-guard.guard';

describe('reportsGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => reportsGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
