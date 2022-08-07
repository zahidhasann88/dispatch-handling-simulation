import { TestBed } from '@angular/core/testing';

import { DespatchEnvelopService } from './despatch-envelop.service';

describe('DespatchEnvelopService', () => {
  let service: DespatchEnvelopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DespatchEnvelopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
