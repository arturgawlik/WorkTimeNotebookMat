import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimeNoteListComponent } from './work-time-note-list.component';

describe('WorkTimeNoteListComponent', () => {
  let component: WorkTimeNoteListComponent;
  let fixture: ComponentFixture<WorkTimeNoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTimeNoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTimeNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
