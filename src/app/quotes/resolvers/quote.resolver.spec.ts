import { TestBed } from '@angular/core/testing';

import { QuoteResolver } from './quote.resolver';

describe('QuoteResolver', () => {
  let resolver: QuoteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuoteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
