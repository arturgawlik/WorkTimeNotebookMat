import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/services/fetching/fetching.service';

@Component({
  selector: 'app-authorized-shell',
  styleUrls: ['./authorized-shell.component.scss'],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AuthorizedShellComponent {
}
