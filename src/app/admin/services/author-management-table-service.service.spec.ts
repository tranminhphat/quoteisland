import { TestBed } from '@angular/core/testing';

import { AuthorManagementTableServiceService } from './author-management-table-service.service';

describe('AuthorManagementTableServiceService', () => {
  let service: AuthorManagementTableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorManagementTableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
