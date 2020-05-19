import { Note } from 'src/app/models/note';
import { DateTime } from 'luxon';

export class WorkTimeNoteDisplayModel {

    hasData = false;
    days: WorkTimeNoteDayDisplayModel[] = [];

    constructor(notes: Note[]) {
        if (notes && notes.length) {
            this.hasData = true;

            notes.forEach(note => {
                const firstStartDateTime = DateTime.fromISO(note.startDate);
                const dayName = this.getDayName(note.startDate);
                const workTimeItemDisplayModel = {
                    startDateTime: DateTime.fromISO(note.startDate),
                    startHour: this.getHour(note.startDate),
                    endHour: this.getHour(note.endDate),
                    durationTimeInMinutes: this.getDiffInMinutes(note.startDate, note.endDate),
                    type: note.type,
                    customer: note.customer,
                    url: note.url,
                    description: note.description
                };

                const workTimeNoteDayDisplayModel = this.days.filter(x => x.dayName === dayName)[0];
                if (workTimeNoteDayDisplayModel) {
                    // insert element on right place to avoid sorting
                    const index = workTimeNoteDayDisplayModel.items.findIndex(x => x.startDateTime > workTimeItemDisplayModel.startDateTime);
                    if (index === -1)
                        workTimeNoteDayDisplayModel.items.push(workTimeItemDisplayModel);
                    else
                        workTimeNoteDayDisplayModel.items.splice(index, 0, workTimeItemDisplayModel);
                } else {
                    const day = {
                        firstStartDateTime,
                        dayName,
                        items: [workTimeItemDisplayModel]
                    };
                    // insert element on right place to avoid sorting
                    const index = this.days.findIndex(x => x.firstStartDateTime < firstStartDateTime);
                    if (index === -1)
                        this.days.push(day);
                    else
                        this.days.splice(index, 0, day);
                }
            });

        }
    }

    private getDiffInMinutes(isoDateTime1: string, isoDateTime2: string) {
        return DateTime.fromISO(isoDateTime2).diff(DateTime.fromISO(isoDateTime1), 'minutes').minutes;
    }

    private getHour(isoDateTime: string) {
        return DateTime.fromISO(isoDateTime).toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: false });
    }

    private getDayName(isoDateTime: string) {
        return DateTime.fromISO(isoDateTime).toLocaleString(DateTime.DATE_SHORT) + '(' + DateTime.fromISO(isoDateTime).weekdayShort + ')';
    }
}

export interface WorkTimeNoteDayDisplayModel {
    firstStartDateTime: DateTime;
    dayName: string;
    items: WorkTimeItemDisplayModel[];
}

export interface WorkTimeItemDisplayModel {
    startDateTime: DateTime;
    startHour: string;
    endHour: string;
    durationTimeInMinutes: number;
    type: string;
    customer: string;
    url: string;
    description: string;
}
