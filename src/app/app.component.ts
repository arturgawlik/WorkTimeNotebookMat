import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div *ngIf="isFetching">
      <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  isFetching = false;
}
