import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';

@Component({
  selector: 'app-authorized-shell',
  templateUrl: './authorized-shell.component.html',
  styleUrls: ['./authorized-shell.component.scss']
})
export class AuthorizedShellComponent {

  constructor(private auth: AngularFireAuth, private router: Router, private fetching: FetchingService) {
  }

  logout() {
    this.fetching.show();
    this.auth.signOut()
      .then(r => {
        this.router.navigate(['/login']);
        this.fetching.hide();
      })
      .catch(err => {
        this.fetching.hide();
      })
  }

}
