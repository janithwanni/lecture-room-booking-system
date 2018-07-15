import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusatglanceComponent } from './statusatglance.component';

describe('StatusatglanceComponent', () => {
  let component: StatusatglanceComponent;
  let fixture: ComponentFixture<StatusatglanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusatglanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusatglanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
