import { DateTime } from 'luxon';

export interface Note {
    // id: string,
    type: string,
    customer: string,
    description: string,
    url: string,
    startDate: string,
    endDate: string
}

export class NoteDTO implements Note {
    // id: string
    type: string;
    customer: string;
    description: string;
    url: string;
    startDate: string;
    endDate: string;
    userId: string;

    constructor(noteFormValue: NoteFormValue, userId: string) {
        this.userId = userId;
        this.type = noteFormValue.type;
        this.customer = noteFormValue.customer;
        this.description = noteFormValue.description;
        this.url = noteFormValue.url;
        this.startDate = this.getFullDateFromTimeString(noteFormValue.startDate);
        this.endDate = this.getFullDateFromTimeString(noteFormValue.endDate);
    }

    private getFullDateFromTimeString(strDate: string) {
        return DateTime.local().set({ hour: +strDate.split(':')[0], minute: +strDate.split(':')[1], second: 0, millisecond: 0}).toString()
    }

}

export interface NoteFormValue {
    type: string,
    customer: string,
    description: string,
    url: string,
    startDate: string,
    endDate: string
}
