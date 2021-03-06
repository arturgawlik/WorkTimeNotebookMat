import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizedShellComponent } from './components/authorized-shell/authorized-shell.component';
import { UnauthorizedShellComponent } from './components/unauthorized-shell/unauthorized-shell.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseInterceptor } from './interceptors/base.interceptor';
import { FetchingService } from './services/fetching/fetching.service';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddEditWorkTimeNoteEntityComponent } from './components/add-edit-work-time-note-entity/add-edit-work-time-note-entity.component';
import { WorkTimeNoteListComponent } from './components/work-time-note-list/work-time-note-list.component';
import { MatTableModule } from '@angular/material/table';
import { WorkTimeNoteItemComponent } from './components/work-time-note-item/work-time-note-item.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import 'firebase/firestore';
import { NotesState } from './store/noteList/notes.state';
import { WorkTimeNoteListSkeletonComponent } from './components/work-time-note-list/skeleton/work-time-note-list-skeleton.component';
import { NoteFormState } from './store/noteForm/note-form.state';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotesBackendService } from './services/noteBacked/notes-backend-service.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizedShellComponent,
    UnauthorizedShellComponent,
    FooterComponent,
    TopbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddEditWorkTimeNoteEntityComponent,
    WorkTimeNoteListComponent,
    WorkTimeNoteItemComponent,
    WorkTimeNoteListSkeletonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    AngularFirestoreModule,
    MatTooltipModule,
    NgxsModule.forRoot([NotesState, NoteFormState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    FetchingService,
    NotesBackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
