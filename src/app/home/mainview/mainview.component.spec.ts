
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainviewComponent } from './mainview.component';

describe('MainviewComponent', () => {
  let component: MainviewComponent;
  let fixture: ComponentFixture<MainviewComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
