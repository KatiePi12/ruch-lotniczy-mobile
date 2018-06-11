import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsEndorsementsComponent } from './ratings-endorsements.component';

describe('RatingsEndorsementsComponent', () => {
  let component: RatingsEndorsementsComponent;
  let fixture: ComponentFixture<RatingsEndorsementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsEndorsementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
