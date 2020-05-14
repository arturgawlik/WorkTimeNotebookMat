import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-work-time-note-list',
  templateUrl: './work-time-note-list.component.html',
  styleUrls: ['./work-time-note-list.component.scss']
})
export class WorkTimeNoteListComponent implements OnInit {

  constructor(private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
  }

}
