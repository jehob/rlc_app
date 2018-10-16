import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsListItemComponent } from './records-list-item.component';

describe('RecordsListItemComponent', () => {
  let component: RecordsListItemComponent;
  let fixture: ComponentFixture<RecordsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
