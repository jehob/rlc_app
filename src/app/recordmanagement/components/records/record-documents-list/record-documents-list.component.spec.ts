import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDocumentsListComponent } from './record-documents-list.component';

describe('RecordDocumentsListComponent', () => {
  let component: RecordDocumentsListComponent;
  let fixture: ComponentFixture<RecordDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
