import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimeNoteItemComponent } from './work-time-note-item.component';

describe('WorkTimeNoteItemComponent', () => {
  let component: WorkTimeNoteItemComponent;
  let fixture: ComponentFixture<WorkTimeNoteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTimeNoteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTimeNoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
