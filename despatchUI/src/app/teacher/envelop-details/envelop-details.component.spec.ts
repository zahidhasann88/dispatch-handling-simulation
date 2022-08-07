import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopDetailsComponent } from './envelop-details.component';

describe('EnvelopDetailsComponent', () => {
  let component: EnvelopDetailsComponent;
  let fixture: ComponentFixture<EnvelopDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvelopDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvelopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
