import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedShellComponent } from './components/unauthorized-shell/unauthorized-shell.component';
import { AuthorizedShellComponent } from './components/authorized-shell/authorized-shell.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthorizedGuard } from './guards/authorized.guard';
import { UnauthorizedGuard } from './guards/unauthorized.guard';


const routes: Routes = [
  { path: '', component: AuthorizedShellComponent, canActivate: [AuthorizedGuard] },
  {
    path: '', component: UnauthorizedShellComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
    canActivate: [UnauthorizedGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
