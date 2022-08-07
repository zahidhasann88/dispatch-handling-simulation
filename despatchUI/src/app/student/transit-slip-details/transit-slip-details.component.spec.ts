import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitSlipDetailsComponent } from './transit-slip-details.component';

describe('TransitSlipDetailsComponent', () => {
  let component: TransitSlipDetailsComponent;
  let fixture: ComponentFixture<TransitSlipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitSlipDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitSlipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
