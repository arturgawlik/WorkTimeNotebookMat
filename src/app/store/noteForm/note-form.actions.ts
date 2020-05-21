import { NoteFormValue } from 'src/app/models/note';

export class SetFormNewState {
    static readonly type = '[Note Form] Set form new state';

    constructor(public newState: NoteFormValue) {
    }

}
