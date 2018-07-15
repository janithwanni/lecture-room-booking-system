import { TestBed, inject } from '@angular/core/testing';

import { SearchbookingsRtdbService } from './searchbookings-rtdb.service';

describe('SearchbookingsRtdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchbookingsRtdbService]
    });
  });

  it('should be created', inject([SearchbookingsRtdbService], (service: SearchbookingsRtdbService) => {
    expect(service).toBeTruthy();
  }));
});
