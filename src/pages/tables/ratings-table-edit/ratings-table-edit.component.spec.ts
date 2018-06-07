import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RatingsTableEditComponent} from './ratings-table-edit.component';

describe('RatingsTableEditComponent', () => {
  let component: RatingsTableEditComponent;
  let fixture: ComponentFixture<RatingsTableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsTableEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
