import { TestBed, inject } from '@angular/core/testing';

import { MakeBookingRtdbService } from './make-booking-rtdb.service';

describe('MakeBookingRtdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeBookingRtdbService]
    });
  });

  it('should be created', inject([MakeBookingRtdbService], (service: MakeBookingRtdbService) => {
    expect(service).toBeTruthy();
  }));
});
