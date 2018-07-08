import { TestBed, inject } from '@angular/core/testing';

import { UserInfoManagerService } from './user-info-manager.service';

describe('UserInfoManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoManagerService]
    });
  });

  it('should be created', inject([UserInfoManagerService], (service: UserInfoManagerService) => {
    expect(service).toBeTruthy();
  }));
});
