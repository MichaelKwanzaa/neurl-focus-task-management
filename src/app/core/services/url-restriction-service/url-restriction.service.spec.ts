import { TestBed } from '@angular/core/testing';

import { UrlRestrictionService } from './url-restriction.service';

describe('UrlRestrictionService', () => {
  let service: UrlRestrictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlRestrictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
