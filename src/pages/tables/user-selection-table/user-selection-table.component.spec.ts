import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionTableComponent } from './user-selection-table.component';

describe('UserSelectionTableComponent', () => {
  let component: UserSelectionTableComponent;
  let fixture: ComponentFixture<UserSelectionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
