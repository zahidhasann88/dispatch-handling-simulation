import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitSlipComponent } from './transit-slip.component';

describe('TransitSlipComponent', () => {
  let component: TransitSlipComponent;
  let fixture: ComponentFixture<TransitSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
