import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FetchingService } from './services/fetching/fetching.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div *ngIf="isFetching">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, AfterViewInit {
  
  isFetching = true;

  constructor(private fetching: FetchingService) {
  }

  ngOnInit() {
    this.fetching.isLoading.subscribe(v => {
      if(v) {
        this.isFetching = v;
      } else {
        setTimeout(() => this.isFetching = v, 500);
      }
    });
  }

  ngAfterViewInit(): void {
    this.fetching.hide();
  }

}
