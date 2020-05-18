import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Note } from 'src/app/models/note';
import { AddNote, InitStateByServerData } from './note.actions';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, mergeMap, tap, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';


export interface NotesStateModel {
    notes: Note[]
}

@State<NotesStateModel>({
    name: 'notes',
    defaults: {
        notes: []
    },
})
@Injectable()
export class NotesState {

    constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    }

    @Selector()
    static notes(state: NotesStateModel) {
        return state.notes;
    }

    @Action(AddNote)
    addNote(ctx: StateContext<NotesStateModel>, action: AddNote) {
        const state = ctx.getState();

        ctx.setState({
            notes: [
                ...state.notes,
                action.note
            ]
        });
    }

    @Action(InitStateByServerData)
    initStateByServerData(ctx: StateContext<NotesStateModel>) {
        const notesBackendCollection = this.auth.user.pipe(
            mergeMap(u => this.firestore.collection<Note>('/notes', ref => ref.where('userId', '==', u.uid)).valueChanges()),
            first()
        );
        return notesBackendCollection.pipe(
            tap(data => {
                ctx.setState({
                    notes: data
                })
            })
        );
    }

}
