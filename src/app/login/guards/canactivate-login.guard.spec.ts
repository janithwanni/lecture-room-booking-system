import { TestBed, async, inject } from '@angular/core/testing';

import { CanactivateLoginGuard } from './canactivate-login.guard';

describe('CanactivateLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanactivateLoginGuard]
    });
  });

  it('should ...', inject([CanactivateLoginGuard], (guard: CanactivateLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
