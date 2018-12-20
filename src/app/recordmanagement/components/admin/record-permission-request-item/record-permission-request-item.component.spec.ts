import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPermissionRequestItemComponent } from './record-permission-request-item.component';

describe('RecordPermissionRequestItemComponent', () => {
  let component: RecordPermissionRequestItemComponent;
  let fixture: ComponentFixture<RecordPermissionRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordPermissionRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPermissionRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
