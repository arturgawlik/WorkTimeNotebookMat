import { State, Action, StateContext } from '@ngxs/store';
import { Note } from 'src/app/models/note';
import { AddNote } from './note.actions';


@State<Note[]>({
    name: 'notes',
    defaults: [],
})
export class NotesState {

    @Action(AddNote)
    addNote(ctx: StateContext<Note[]>, action: AddNote) {
        const state = ctx.getState();
        
        ctx.setState([
            ...state,
            action.note
        ]);
    }

}
