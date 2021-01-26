import { TestBed } from '@angular/core/testing';

import { UserManagementTableServiceService } from './user-management-table-service.service';

describe('UserManagementTableServiceService', () => {
  let service: UserManagementTableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementTableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
