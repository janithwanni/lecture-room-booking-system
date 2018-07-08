import { TestBed, inject } from '@angular/core/testing';

import { TimeslotManagerService } from './timeslot-manager.service';

describe('TimeslotManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeslotManagerService]
    });
  });

  it('should be created', inject([TimeslotManagerService], (service: TimeslotManagerService) => {
    expect(service).toBeTruthy();
  }));
});
