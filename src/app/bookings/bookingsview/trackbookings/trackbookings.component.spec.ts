
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackbookingsComponent } from './trackbookings.component';

describe('TrackbookingsComponent', () => {
  let component: TrackbookingsComponent;
  let fixture: ComponentFixture<TrackbookingsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackbookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
