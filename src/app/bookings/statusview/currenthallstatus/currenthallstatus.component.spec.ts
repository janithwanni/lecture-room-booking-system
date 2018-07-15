import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenthallstatusComponent } from './currenthallstatus.component';

describe('CurrenthallstatusComponent', () => {
  let component: CurrenthallstatusComponent;
  let fixture: ComponentFixture<CurrenthallstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenthallstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenthallstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
