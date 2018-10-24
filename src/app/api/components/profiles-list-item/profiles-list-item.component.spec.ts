import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesListItemComponent } from './profiles-list-item.component';

describe('ProfilesListItemComponent', () => {
  let component: ProfilesListItemComponent;
  let fixture: ComponentFixture<ProfilesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
