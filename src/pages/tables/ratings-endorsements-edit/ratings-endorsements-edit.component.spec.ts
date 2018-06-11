import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RatingsEndorsementsEditComponent} from './ratings-endorsements-edit.component';

describe('RatingsEndorsementsEditComponent', () => {
  let component: RatingsEndorsementsEditComponent;
  let fixture: ComponentFixture<RatingsEndorsementsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsEndorsementsEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsEndorsementsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
