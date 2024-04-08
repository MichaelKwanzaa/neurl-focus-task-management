import { TestBed } from '@angular/core/testing';

import { NotificationLocalService } from './notification-local.service';

describe('NotificationLocalService', () => {
  let service: NotificationLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
