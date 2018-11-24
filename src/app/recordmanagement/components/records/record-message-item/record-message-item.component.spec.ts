import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordMessageItemComponent } from './record-message-item.component';

describe('RecordMessageItemComponent', () => {
  let component: RecordMessageItemComponent;
  let fixture: ComponentFixture<RecordMessageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordMessageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
