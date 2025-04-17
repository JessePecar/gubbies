import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inventoryGuard } from './inventory.guard';

describe('inventoryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => inventoryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
