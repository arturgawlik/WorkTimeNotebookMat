import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedShellComponent } from './components/unauthorized-shell/unauthorized-shell.component';
import { AuthorizedShellComponent } from './components/authorized-shell/authorized-shell.component';


const routes: Routes = [
  { path: '', component: UnauthorizedShellComponent },
  { path: '', component: AuthorizedShellComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
