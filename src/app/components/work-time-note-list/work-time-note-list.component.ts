import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { NotesState, NotesStateModel } from 'src/app/store/note/notes.state';
import { Note } from 'src/app/models/note';
import { WorkTimeNoteDisplayModel } from './display.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-work-time-note-list',
  templateUrl: './work-time-note-list.component.html',
  styleUrls: ['./work-time-note-list.component.scss']
})
export class WorkTimeNoteListComponent {

  @Select(NotesState.notes) notes$: Observable<Note[]>;
  notesDisplayModel$: Observable<WorkTimeNoteDisplayModel>;

  constructor() {
    this.notesDisplayModel$ = this.notes$.pipe(
      map(i => new WorkTimeNoteDisplayModel(i))
    );
  }

}
