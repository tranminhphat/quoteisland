import { TestBed } from '@angular/core/testing';

import { QuotesResolver } from './quotes.resolver';

describe('QuotesResolver', () => {
  let resolver: QuotesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuotesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
