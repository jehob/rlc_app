import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullRecordDetailComponent } from './full-record-detail.component';

describe('FullRecordDetailComponent', () => {
  let component: FullRecordDetailComponent;
  let fixture: ComponentFixture<FullRecordDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullRecordDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullRecordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
