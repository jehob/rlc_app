import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsFieldComponent } from './consultants-field.component';

describe('ConsultantsFieldComponent', () => {
  let component: ConsultantsFieldComponent;
  let fixture: ComponentFixture<ConsultantsFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantsFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
