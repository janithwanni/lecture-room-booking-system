import { TestBed, inject } from '@angular/core/testing';

import { BookingsOpsRtdbService } from './bookings-ops-rtdb.service';

describe('BookingsOpsRtdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingsOpsRtdbService]
    });
  });

  it('should be created', inject([BookingsOpsRtdbService], (service: BookingsOpsRtdbService) => {
    expect(service).toBeTruthy();
  }));
});
