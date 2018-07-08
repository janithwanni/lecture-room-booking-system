import { TestBed, inject } from '@angular/core/testing';

import { HallInfoManagerService } from './hall-info-manager.service';

describe('HallInfoManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HallInfoManagerService]
    });
  });

  it('should be created', inject([HallInfoManagerService], (service: HallInfoManagerService) => {
    expect(service).toBeTruthy();
  }));
});
