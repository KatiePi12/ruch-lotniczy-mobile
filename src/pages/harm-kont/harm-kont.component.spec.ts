import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmKontComponent } from './harm-kont.component';

describe('HarmKontComponent', () => {
  let component: HarmKontComponent;
  let fixture: ComponentFixture<HarmKontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarmKontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarmKontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
