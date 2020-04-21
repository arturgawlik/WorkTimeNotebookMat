import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  template: `
    <app-topbar></app-topbar>
    <main>
      <app-add-edit-work-time-note-entity></app-add-edit-work-time-note-entity>
      <app-work-time-note-list></app-work-time-note-list>
    </main>
    <app-footer></app-footer>
  `
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
