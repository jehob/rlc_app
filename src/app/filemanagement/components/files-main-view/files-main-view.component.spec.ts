import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesMainViewComponent } from './files-main-view.component';

describe('FilesMainViewComponent', () => {
  let component: FilesMainViewComponent;
  let fixture: ComponentFixture<FilesMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
