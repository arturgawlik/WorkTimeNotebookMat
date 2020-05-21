import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { ClearNotes } from 'src/app/store/note/note.actions';

@Component({
  selector: 'app-nav-topbar',
  styleUrls: ['./topbar.component.scss'],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span class="logo"></span>
        <div></div>
        <div id="auth-con" *ngIf="auth.user | async">
          <a mat-button (click)="logout()">
            <span class="material-icons">exit_to_app</span>
          </a>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class TopbarComponent {

  constructor(public auth: AngularFireAuth, private router: Router, private fetching: FetchingService, private snackBar: MatSnackBar, private store: Store) {
  }

  logout() {
    this.fetching.show();
    this.auth.signOut()
      .then(r => {
        this.router.navigate(['/login']);
        this.fetching.hide();
        this.store.dispatch(new ClearNotes());
      })
      .catch(err => {
        this.fetching.hide();
        this.snackBar.open('Something goes wrong... :(');
      });
  }

}
