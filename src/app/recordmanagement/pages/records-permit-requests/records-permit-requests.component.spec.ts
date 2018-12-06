import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsPermitRequestsComponent } from './records-permit-requests.component';

describe('RecordsPermitRequestsComponent', () => {
  let component: RecordsPermitRequestsComponent;
  let fixture: ComponentFixture<RecordsPermitRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsPermitRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsPermitRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
