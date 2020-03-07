import { Component, AfterViewInit } from '@angular/core';
import { FetchingService } from './services/fetching.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div *ngIf="isFetching" style="position: absolute; width: 100%">
      <mat-progress-bar mode="indeterminate" color="warn"></mat-progress-bar>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements AfterViewInit {
  
  isFetching = true;

  constructor(private fetching: FetchingService) {
    fetching.isLoading.subscribe(v => {
      if(v) {
        this.isFetching = v
      } else {
        setTimeout(() => this.isFetching = v, 500);
      }
    });
  }

  ngAfterViewInit(): void {
    this.fetching.hide();
  }

}
