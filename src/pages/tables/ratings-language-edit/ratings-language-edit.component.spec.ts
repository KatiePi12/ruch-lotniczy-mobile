import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RatingsLanguageEditComponent} from './ratings-language-edit.component';

describe('RatingsLanguageEditComponent', () => {
  let component: RatingsLanguageEditComponent;
  let fixture: ComponentFixture<RatingsLanguageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsLanguageEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsLanguageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
