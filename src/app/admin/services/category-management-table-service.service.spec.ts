import { TestBed } from '@angular/core/testing';

import { CategoryManagementTableServiceService } from './category-management-table-service.service';

describe('CategoryManagementTableServiceService', () => {
  let service: CategoryManagementTableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryManagementTableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
