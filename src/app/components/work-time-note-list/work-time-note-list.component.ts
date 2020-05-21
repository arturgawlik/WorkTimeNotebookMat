import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { NotesState, NotesStateModel } from 'src/app/store/noteList/notes.state';
import { Note } from 'src/app/models/note';
import { WorkTimeNoteDisplayModel } from './display.model';
import { map, scan, tap, takeWhile } from 'rxjs/operators';
import { InitStateByServerData } from 'src/app/store/noteList/note.actions';
import { interval as observableInterval } from "rxjs";

@Component({
  selector: 'app-work-time-note-list',
  templateUrl: './work-time-note-list.component.html',
  styleUrls: ['./work-time-note-list.component.scss']
})
export class WorkTimeNoteListComponent {

  @Select(NotesState.notes) notes$: Observable<Note[]>;
  notesDisplayModel$: Observable<WorkTimeNoteDisplayModel>;

  constructor(private store: Store, public elRef: ElementRef) {
    this.notesDisplayModel$ = this.notes$.pipe(
      map(i => new WorkTimeNoteDisplayModel(i))
    );
    store.dispatch(new InitStateByServerData());
  }

  scrollBtnOpacity = '0';

  @HostListener('scroll')
  onScroll() {
    this.scrollBtnOpacity = this.elRef.nativeElement.scrollTop > 100 ? '1' : '0';
  }

  scrollToTop() {
    const el = this.elRef.nativeElement;
    const duration = 100;
    const interval = 5;
    const move = el.scrollTop * interval / duration;
    observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, el.scrollTop),
      tap(position => el.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }

}
