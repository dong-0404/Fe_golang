import { TestBed } from '@angular/core/testing';

import { ManagerCvServiceService } from './manager-cv-service.service';

describe('ManagerCvServiceService', () => {
  let service: ManagerCvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerCvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
