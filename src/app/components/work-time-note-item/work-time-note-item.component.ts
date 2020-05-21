import { Component, OnInit, Input } from '@angular/core';
import { WorkTimeItemDisplayModel } from '../work-time-note-list/display.model';
import { Store } from '@ngxs/store';
import { SetFormNewState } from 'src/app/store/noteForm/note-form.actions';

@Component({
  selector: 'app-work-time-note-item',
  templateUrl: './work-time-note-item.component.html',
  styleUrls: ['./work-time-note-item.component.scss']
})
export class WorkTimeNoteItemComponent implements OnInit {

  @Input() item: WorkTimeItemDisplayModel;

  constructor(public store: Store) { }

  ngOnInit(): void {
  }

  openUrl() {
    window.open(this.item.url, '_blank');
  }

  copyBtnClick() {
    this.store.dispatch(new SetFormNewState({
      type: this.item.type,
      customer: this.item.customer,
      description: this.item.description,
      url: this.item.url,
      startDate: null,
      endDate: null
    }));
  }

}
