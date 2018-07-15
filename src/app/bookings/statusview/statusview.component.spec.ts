
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusviewComponent } from './statusview.component';

describe('StatusviewComponent', () => {
  let component: StatusviewComponent;
  let fixture: ComponentFixture<StatusviewComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
