import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitSlipReceivedComponent } from './transit-slip-received.component';

describe('TransitSlipReceivedComponent', () => {
  let component: TransitSlipReceivedComponent;
  let fixture: ComponentFixture<TransitSlipReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitSlipReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitSlipReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
