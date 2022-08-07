import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopTableComponent } from './envelop-table.component';

describe('EnvelopTableComponent', () => {
  let component: EnvelopTableComponent;
  let fixture: ComponentFixture<EnvelopTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvelopTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvelopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
