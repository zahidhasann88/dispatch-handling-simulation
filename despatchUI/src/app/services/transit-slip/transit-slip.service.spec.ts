import { TestBed } from '@angular/core/testing';

import { TransitSlipService } from './transit-slip.service';

describe('TransitSlipService', () => {
  let service: TransitSlipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitSlipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
