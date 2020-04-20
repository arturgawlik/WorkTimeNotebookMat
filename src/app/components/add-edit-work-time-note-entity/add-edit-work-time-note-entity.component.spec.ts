import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkTimeNoteEntityComponent } from './add-edit-work-time-note-entity.component';

describe('AddEditWorkTimeNoteEntityComponent', () => {
  let component: AddEditWorkTimeNoteEntityComponent;
  let fixture: ComponentFixture<AddEditWorkTimeNoteEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditWorkTimeNoteEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorkTimeNoteEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
