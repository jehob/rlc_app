import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClientDialogComponent } from './select-client-dialog.component';

describe('SelectClientDialogComponent', () => {
  let component: SelectClientDialogComponent;
  let fixture: ComponentFixture<SelectClientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
