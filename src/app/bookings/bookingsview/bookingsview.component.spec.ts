
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsviewComponent } from './bookingsview.component';

describe('BookingsviewComponent', () => {
  let component: BookingsviewComponent;
  let fixture: ComponentFixture<BookingsviewComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
