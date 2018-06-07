import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsLanguageComponent } from './ratings-language.component';

describe('RatingsLanguageComponent', () => {
  let component: RatingsLanguageComponent;
  let fixture: ComponentFixture<RatingsLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
