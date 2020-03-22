import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';

@Component({
  selector: 'app-authorized-shell',
  templateUrl: './authorized-shell.component.html',
  styleUrls: ['./authorized-shell.component.scss']
})
export class AuthorizedShellComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router, private fetching: FetchingService) { }

  ngOnInit(): void {
  }

  logout() {
    this.fetching.show();
    this.auth.signOut()
    .then(r => {
      console.log(r);
      this.router.navigate(['/login']);
      this.fetching.hide();
    })
    .catch(err => {
      console.log(err);
      this.fetching.hide();
    })
  }

}
