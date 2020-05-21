import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimeNoteListSkeletonComponent } from './work-time-note-list-skeleton.component';

describe('WorkTimeNoteListSkeletonComponent', () => {
  let component: WorkTimeNoteListSkeletonComponent;
  let fixture: ComponentFixture<WorkTimeNoteListSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTimeNoteListSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTimeNoteListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
