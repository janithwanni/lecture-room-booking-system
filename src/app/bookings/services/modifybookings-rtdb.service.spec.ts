import { TestBed, inject } from '@angular/core/testing';

import { ModifybookingsRtdbService } from './modifybookings-rtdb.service';

describe('ModifybookingsRtdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifybookingsRtdbService]
    });
  });

  it('should be created', inject([ModifybookingsRtdbService], (service: ModifybookingsRtdbService) => {
    expect(service).toBeTruthy();
  }));
});
