import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SummaryOvertimeComponent} from './summary-overtime.component';

describe('SummaryOvertimeComponent', () => {
  let component: SummaryOvertimeComponent;
  let fixture: ComponentFixture<SummaryOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryOvertimeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
