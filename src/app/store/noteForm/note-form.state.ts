import { NoteFormValue } from 'src/app/models/note';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetFormNewState } from './note-form.actions';


export interface NoteFormStateModel {
    formState: NoteFormValue;
}

@State<NoteFormStateModel>({
    name: 'noteForm',
    defaults: {
        formState: null
    },
})
@Injectable()
export class NoteFormState {

    @Selector()
    static noteForm(state: NoteFormStateModel) {
        return state.formState;
    }

    @Action(SetFormNewState)
    setFormNewState(ctx: StateContext<NoteFormStateModel>, action: SetFormNewState) {
        ctx.setState({
            formState: {
                ...action.newState
            }
        });
    }

}
