import { Note } from 'src/app/models/note';

export class AddNote {
    static readonly type = '[Note] Add note';

    constructor(public note: Note) {
    }

}


export class InitStateByServerData {
    static readonly type = '[Note] Init state by server data'
}
