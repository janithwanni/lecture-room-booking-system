import { TestBed, inject } from '@angular/core/testing';

import { DatastoreManagerService } from './datastore-manager.service';

describe('DatastoreManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatastoreManagerService]
    });
  });

  it('should be created', inject([DatastoreManagerService], (service: DatastoreManagerService) => {
    expect(service).toBeTruthy();
  }));
});
