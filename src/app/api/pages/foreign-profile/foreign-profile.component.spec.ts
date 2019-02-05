import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignProfileComponent } from './foreign-profile.component';

describe('ForeignProfileComponent', () => {
  let component: ForeignProfileComponent;
  let fixture: ComponentFixture<ForeignProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
