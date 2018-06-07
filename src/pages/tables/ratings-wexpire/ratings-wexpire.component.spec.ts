import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsWExpireComponent } from './ratings-wexpire.component';

describe('RatingsWExpireComponent', () => {
  let component: RatingsWExpireComponent;
  let fixture: ComponentFixture<RatingsWExpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsWExpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsWExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
