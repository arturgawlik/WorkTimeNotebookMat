import { Component, OnInit, Input } from '@angular/core';
import { WorkTimeItemDisplayModel } from '../work-time-note-list/display.model';

@Component({
  selector: 'app-work-time-note-item',
  templateUrl: './work-time-note-item.component.html',
  styleUrls: ['./work-time-note-item.component.scss']
})
export class WorkTimeNoteItemComponent implements OnInit {

  @Input() item: WorkTimeItemDisplayModel;

  constructor() { }

  ngOnInit(): void {
  }

  openUrl() {
    window.open(this.item.url, '_blank');
  }

}
