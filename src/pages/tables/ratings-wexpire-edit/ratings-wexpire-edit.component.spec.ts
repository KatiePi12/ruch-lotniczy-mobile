import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RatingsWexpireEditComponent} from './ratings-wexpire-edit.component';

describe('RatingsWexpireEditComponent', () => {
  let component: RatingsWexpireEditComponent;
  let fixture: ComponentFixture<RatingsWexpireEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsWexpireEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsWexpireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
