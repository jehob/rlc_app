import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordMessagesComponent } from './record-messages.component';

describe('RecordMessagesComponent', () => {
  let component: RecordMessagesComponent;
  let fixture: ComponentFixture<RecordMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
