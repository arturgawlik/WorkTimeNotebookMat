import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorized-shell',
  templateUrl: './authorized-shell.component.html',
  styleUrls: ['./authorized-shell.component.scss']
})
export class AuthorizedShellComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut()
    .then(r => {
      console.log(r);
      this.router.navigate(['/login']);
    })
    .catch(err => {
      console.log(err);
    })
  }

}
