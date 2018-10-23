import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedRecordDetailComponent } from './restricted-record-detail.component';

describe('RestrictedRecordDetailComponent', () => {
  let component: RestrictedRecordDetailComponent;
  let fixture: ComponentFixture<RestrictedRecordDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedRecordDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedRecordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
