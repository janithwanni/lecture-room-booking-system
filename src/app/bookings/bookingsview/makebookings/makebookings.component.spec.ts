import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakebookingsComponent } from './makebookings.component';

describe('MakebookingsComponent', () => {
  let component: MakebookingsComponent;
  let fixture: ComponentFixture<MakebookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakebookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakebookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
