import { Injectable } from '@angular/core';
import { NoteModel } from './note.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NoteFilter } from './helpers/note.filter';

@Injectable({
  providedIn: 'root'
})
export class NotesBackendService {

  notes: Observable<AngularFirestoreCollection<NoteModel>>;

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.notes = this.auth.user.pipe(
      map(u => firestore.collection<NoteModel>(`/notes/${u.uid}/items/`))
    );
  }

  add(note: NoteModel) {
    return this.notes.pipe(
      mergeMap(afc => afc.add(note))
    );
  }

  get(filter?: NoteFilter) {
    return this.notes.pipe(
      mergeMap(afc => afc.snapshotChanges([])),
      map(actions => actions.map(a => a.payload.doc.data())),
    );
  }

}
