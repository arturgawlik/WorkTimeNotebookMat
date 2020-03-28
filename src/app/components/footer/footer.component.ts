import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="app-footer-theme">🐱 created by hufcio 🐱</div>
  `
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
