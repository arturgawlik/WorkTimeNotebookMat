import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  
  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.user.pipe(
      map(u => {
        if (!u) {
          return true;
        }
        else {
          this.router.navigate(['/']);
          return false;
        }
      })
    )
  }

  
}
