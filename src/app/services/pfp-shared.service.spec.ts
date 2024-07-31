import { TestBed } from '@angular/core/testing';

import { PfpSharedService } from './pfp-shared.service';

describe('PfpSharedService', () => {
  let service: PfpSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfpSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
