import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkViewEnvelopListComponent } from './clerk-view-envelop-list.component';

describe('ClerkViewEnvelopListComponent', () => {
  let component: ClerkViewEnvelopListComponent;
  let fixture: ComponentFixture<ClerkViewEnvelopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkViewEnvelopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkViewEnvelopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
