import { TestBed, async, inject } from '@angular/core/testing';

import { CanactivateHomeGuard } from './canactivate-home.guard';

describe('CanactivateHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanactivateHomeGuard]
    });
  });

  it('should ...', inject([CanactivateHomeGuard], (guard: CanactivateHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
