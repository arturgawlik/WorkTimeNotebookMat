import { Note } from 'src/app/models/note';
import { DateTime } from 'luxon';

export class WorkTimeNoteDisplayModel {

    hasData = false;
    days: WorkTimeNoteDayDisplayModel[] = [];

    constructor(notes: Note[]) {
        if (notes && notes.length) {
            this.hasData = true;

            const groupedByDate = new Map<string, Note[]>();
            notes.forEach(elem => {
                const itemDateTime = DateTime.fromISO(elem.startDate).toLocaleString(DateTime.DATE_SHORT);
                const collection = groupedByDate.get(itemDateTime);
                if (!collection) {
                    groupedByDate.set(itemDateTime, [elem]);
                } else {
                    collection.push(elem);
                }
            });

            groupedByDate.forEach((val, key) => {
                const dayName = key;
                const items = [];
                val.forEach((v) => {
                    items.push({
                        startHour: DateTime.fromISO(v.startDate).toLocaleString(DateTime.TIME_SIMPLE),
                        endHour: DateTime.fromISO(v.endDate).toLocaleString(DateTime.TIME_SIMPLE),
                        durationTimeInMinutes: DateTime.fromISO(v.endDate).diff(DateTime.fromISO(v.startDate), 'minutes').minutes,
                        type: v.type,
                        customer: v.customer,
                        url: v.url,
                        description: v.description
                    });
                });
                this.days.push({ dayName, items });
            });
        }
    }
}

export interface WorkTimeNoteDayDisplayModel {
    dayName: string;
    items: WorkTimeItemDisplayModel[];
}

export interface WorkTimeItemDisplayModel {
    startHour: string;
    endHour: string;
    durationTimeInMinutes: string;
    type: string;
    customer: string;
    url: string;
    description: string;
}
