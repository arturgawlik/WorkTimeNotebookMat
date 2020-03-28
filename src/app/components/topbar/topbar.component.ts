import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  styleUrls: ['./topbar.component.scss'],
  template: `
    <h2 class="app-footer-theme">Work time notebook</h2>
  `,
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
