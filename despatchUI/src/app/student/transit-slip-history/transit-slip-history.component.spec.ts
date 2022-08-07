import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitSlipHistoryComponent } from './transit-slip-history.component';

describe('TransitSlipHistoryComponent', () => {
  let component: TransitSlipHistoryComponent;
  let fixture: ComponentFixture<TransitSlipHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitSlipHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitSlipHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
