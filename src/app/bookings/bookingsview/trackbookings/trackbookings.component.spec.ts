import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackbookingsComponent } from './trackbookings.component';

describe('TrackbookingsComponent', () => {
  let component: TrackbookingsComponent;
  let fixture: ComponentFixture<TrackbookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackbookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
