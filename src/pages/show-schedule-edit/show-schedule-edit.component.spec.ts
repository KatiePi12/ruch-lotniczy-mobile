import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowScheduleEditComponent} from './show-schedule-edit.component';

describe('ShowScheduleEditComponent', () => {
  let component: ShowScheduleEditComponent;
  let fixture: ComponentFixture<ShowScheduleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowScheduleEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowScheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
