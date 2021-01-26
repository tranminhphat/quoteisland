import { TestBed } from '@angular/core/testing';

import { QuoteManagementTableServiceService } from './quote-management-table-service.service';

describe('QuoteManagementTableServiceService', () => {
  let service: QuoteManagementTableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteManagementTableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
